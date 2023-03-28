///hillclimber.java
import static com.google.common.base.Preconditions.checkArgument;
import static com.google.common.base.Preconditions.checkNotNull;

/**
 * A hill climbing algorithm to tune the admission window size.
 *
 * @author ben.manes@gmail.com (Ben Manes)
 */
public interface HillClimber {

  /**
   * Records that a hit occurred with a full cache.
   *
   * @param key the key accessed
   * @param queue the queue the entry was found in
   * @param isFull if the cache is fully populated
   */
  void onHit(long key, QueueType queue, boolean isFull);

  /**
   * Records that a miss occurred with a full cache.
   *
   * @param key the key accessed
   * @param isFull if the cache is fully populated and had to evict
   */
  void onMiss(long key, boolean isFull);

  /**
   * Determines how to adapt the segment sizes.
   *
   * @param windowSize the current window size
   * @param probationSize the current probation size
   * @param protectedSize the current protected size
   * @param isFull if the cache is fully populated
   * @return the adjustment to the segments
   */
  Adaptation adapt(double windowSize, double probationSize, double protectedSize, boolean isFull);

  enum QueueType {
    WINDOW, PROBATION, PROTECTED
  }

  /** The adaptation type and its magnitude. */
  final class Adaptation {
    public enum Type {
      HOLD, INCREASE_WINDOW, DECREASE_WINDOW
    }

    private static final Adaptation HOLD = new Adaptation(0, Type.HOLD);

    public final double amount;
    public final Type type;

    private Adaptation(double amount, Type type) {
      checkArgument(amount >= 0, "Step size %s must be positive", amount);
      this.type = checkNotNull(type);
      this.amount = amount;
    }

    /** Returns the adaption based on the amount, where a negative value decreases the window. */
    public static Adaptation adaptBy(double amount) {
      if (amount == 0) {
        return hold();
      } else if (amount < 0) {
        return decreaseWindow(Math.abs(amount));
      } else {
        return increaseWindow(amount);
      }
    }
    public static int roundToInt(double amount) {
      return (amount < 0) ? (int) Math.floor(amount) : (int) Math.ceil(amount);
    }

    public static Adaptation hold() {
      return HOLD;
    }
    public static Adaptation increaseWindow(double amount) {
      return new Adaptation(amount, Type.INCREASE_WINDOW);
    }
    public static Adaptation decreaseWindow(double amount) {
      return new Adaptation(amount, Type.DECREASE_WINDOW);
    }

    @Override
    public String toString() {
      switch (type) {
        case HOLD: return "0";
        case INCREASE_WINDOW: return "+" + amount;
        case DECREASE_WINDOW: return "-" + amount;
        default: throw new IllegalStateException();
      }
    }
  }
}


///abstractclimber.java
public abstract class AbstractClimber implements HillClimber {
  private static final boolean debug = false;

  protected int sampleSize;
  protected int hitsInMain;
  protected int hitsInWindow;
  protected int hitsInSample;
  protected int missesInSample;
  protected double previousHitRate;

  @Override
  public void onMiss(long key, boolean isFull) {
    if (isFull) {
      missesInSample++;
    }
  }

  @Override
  public void onHit(long key, QueueType queueType, boolean isFull) {
    if (isFull) {
      hitsInSample++;

      if (queueType == QueueType.WINDOW) {
        hitsInWindow++;
      } else {
        hitsInMain++;
      }
    }
  }

  @Override
  public Adaptation adapt(double windowSize, double probationSize,
      double protectedSize, boolean isFull) {
    if (!isFull) {
      return Adaptation.hold();
    }

    checkState(sampleSize > 0, "Sample size may not be zero");
    int sampleCount = (hitsInSample + missesInSample);
    if (sampleCount < sampleSize) {
      return Adaptation.hold();
    }

    double hitRate = (double) hitsInSample / sampleCount;
    Adaptation adaption = Adaptation.adaptBy(adjust(hitRate));
    resetSample(hitRate);

    if (debug) {
      System.out.printf("%.2f\t%.2f%n", 100 * hitRate, windowSize);
    }
    return adaption;
  }

  /** Returns the amount to adapt by. */
  protected abstract double adjust(double hitRate);

  /** Starts the next sample period. */
  protected void resetSample(double hitRate) {
    previousHitRate = hitRate;
    missesInSample = 0;
    hitsInSample = 0;
    hitsInWindow = 0;
    hitsInMain = 0;
  }
}









HillClimb = function(neighborsFunc, valueFunc, start, steepest) {
	this.neighborsFunc = neighborsFunc;
	this.valueFunc = valueFunc;
	this.setNode(start);
	this.steps = 0;
	this.steepest = !!steepest;

    /** Avoid mistakes by always setting the value to match the node. */
  this.setNode = function(node) {
    this.node = node;
    this.value = this.valueFunc(node);
  };

  /** Run one or more steps toward the solution. */
  this.step = function(stepCount) {
    if (!stepCount || stepCount < 0) stepCount = 1<<30;
    const neighborsFunc = this.neighborsFunc, valueFunc = this.valueFunc, steepest = this.steepest;
    const node = this.node, value = this.value, i = 0;
    for (i = 0; i < stepCount; ++i) {
      const nbs = neighborsFunc(node), nbsl = nbs.length;
      const nextVal = value;
      const nextNode = node;
      for (const j = 0; j < nbsl; ++j) {
        const nb = nbs[j];
        const nbVal = valueFunc(nb);
        if (nbVal > nextVal) {
          nextNode = nb;
          nextVal = nbVal;
          if (!steepest && j > 0) break;
        }
      }
      if (nextVal <= valueFunc(node)) break;
      node = nextNode;
      value = nextVal;
    }
    this.steps += i + 1;
    this.setNode(node);
    
    return node;
  };

  this.run = function(stepMs, stepCb, doneCb) {
    const lastNode = this.node, lastValue = this.value;
    const stepInt = null;
    const hillclimb = this;
    stepInt = setInterval(function() {
      hillclimb.step(1);
      if (stepCb) stepCb(hillclimb.node, hillclimb.value, hillclimb.steps);
      if (hillclimb.value == lastValue) {
        clearInterval(stepInt);
        if (doneCb) doneCb(hillclimb.node, hillclimb.value, hillclimb.steps);
        return;
      }
      lastNode = hillclimb.node; lastValue = hillclimb.value;
    }, stepMs);
  };

  this.runWithRestart = function(stepMs, stepCb, doneCb, localDoneCb, nodeFunc) {
    const bestNode = this.node, bestValue = this.value;
    const hillclimb = this;
    
    const complete = function() {
      hillclimb.setNode(bestNode);
      doneCb(hillclimb.node, hillclimb.value, hillclimb.steps);
    };
    
    const maxFails = 4, fails = 0;
    const attempt = function() {
      hillclimb.setNode(nodeFunc());
      
      hillclimb.run.call(hillclimb, stepMs, stepCb, function() {
        localDoneCb.apply(hillclimb, arguments);
        if (hillclimb.value > bestValue) {
          bestNode = hillclimb.node;
          bestValue = hillclimb.value;
          fails = 0;
        } else {
          ++fails;
        }
        if (fails == maxFails) {
          complete();
        } else {
          setTimeout(attempt, 0);
        }
      });
    };
    attempt();
  };
};


