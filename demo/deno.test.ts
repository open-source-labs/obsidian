import { superoak } from 'https://deno.land/x/superoak@2.1.0/mod.ts';
import { describe, it } from 'https://deno.land/x/superoak@2.1.0/test/utils.ts';
import { expect } from 'https://deno.land/x/superoak@2.1.0/test/deps.ts';

import { app } from './server.tsx';

describe('GET request to root url', () => {
  it('Sends 200 Status and Content Type text/html', async (done) => {
    (await superoak(app)).get('/').end((err, res) => {
      expect(res.status).toEqual(200);
      expect(res.type).toEqual('text/html');
      done();
    });
  });
});

describe('GraphQL query response testing', () => {
  it('getBook query succeeds', async (done: any) => {
    (await superoak(app))
      .post('/graphql')
      .send({ query: '{getBook(id:1){ id title author }}' })
      .end((err: any, res: any) => {
        console.log(res);
        expect(res.status).toEqual(200);
        expect(res.body.data.getBook.id).toEqual('1');
        expect(res.body.data.getBook.title).toEqual('Lets Go');
        expect(res.body.data.getBook.author).toEqual('Jeho');
        setTimeout(done, 500);
      });
  });

  it('Invalid getBook query fails', async (done) => {
    (await superoak(app))
      .post('/graphql')
      .send({ query: '{getBook{ id title author }}' })
      .end((err, res) => {
        console.log('error', err);
        console.log(res);
        expect(res.status).toEqual(200);
        expect(res.body.errors).toBeTruthy();
        done();
      });
  });

  it('getEightBooks succeeds', async (done) => {
    (await superoak(app))
      .post('/graphql')
      .send({ query: '{getEightBooks(id:1){ id title author }}' })
      .end((err, res) => {
        console.log(res);
        expect(res.status).toEqual(200);
        expect(res.body.data.getEightBooks).toHaveLength(8);
        setTimeout(done, 500);
      });
  });
});

describe('Redis cache testing', () => {
  it('second query takes less than half time of first', async (done) => {
    let firstResTime: number;
    (await superoak(app))
      .post('/graphql')
      .send({ query: '{getBook(id:2){ id title author }}' })
      .end((err, res) => {
        console.log(res);
        firstResTime = Number(res.header['x-response-time'].slice(0, -2));
      });

    setTimeout(async () => {
      (await superoak(app))
        .post('/graphql')
        .send({ query: '{getBook(id:2){ id title author }}' })
        .end((err, res) => {
          const newTime: number = res.header['x-response-time'].slice(0, -2);

          expect(newTime < 0.5 * firstResTime).toBeTruthy();
          setTimeout(done, 500);
        });
    }, 500);
  });
});
