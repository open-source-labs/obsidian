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


