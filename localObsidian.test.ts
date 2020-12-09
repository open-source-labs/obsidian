// import { superoak } from 'https://deno.land/x/superoak/mod.ts';
// import { describe, it } from 'https://deno.land/x/superoak/test/utils.ts';
// import { expect } from 'https://deno.land/x/superoak/test/deps.ts';
// import { app } from './testServer.ts';
//
// describe('GraphQL query response testing', () => {
//   it('getBook query succeeds', async (done: any) => {
//     (await superoak(app))
//       .post('/graphql')
//       .send({ query: '{getBook(id:1){ id title author }}' })
//       .end((err: any, res: any) => {
//         // console.log(res);
//         expect(res.status).toEqual(200);
//         expect(res.body.data.getBook.id).toEqual('1');
//         expect(res.body.data.getBook.title).toEqual('Lets Go');
//         expect(res.body.data.getBook.author).toEqual('NotJehooo');
//
//         setTimeout(async () => {
//           if (true) {
//             // @ts-ignore
//             const dbOps = await import('./src/dbOps.js');
//             dbOps.redis.close();
//           }
//           done();
//         }, 2000);
//       });
//   });
//
//   it('Invalid getBook query fails', async (done) => {
//     (await superoak(app))
//       .post('/graphql')
//       .send({ query: '{getBook{ id title author }}' })
//       .end((err, res) => {
//         // console.log('error', err);
//         // console.log(res);
//         expect(res.status).toEqual(200);
//         expect(res.body.errors).toBeTruthy();
//         setTimeout(async () => {
//           if (true) {
//             // @ts-ignore
//             const dbOps = await import('./src/dbOps.js');
//             dbOps.redis.close();
//           }
//           done();
//         }, 2000);
//       });
//   });
//
//   it('getEightBooks succeeds', async (done) => {
//     (await superoak(app))
//       .post('/graphql')
//       .send({ query: '{getEightBooks(id:1){ id title author }}' })
//       .end((err, res) => {
//         // console.log(res);
//         expect(res.status).toEqual(200);
//         expect(res.body.data.getEightBooks).toHaveLength(8);
//         setTimeout(async () => {
//           if (true) {
//             // @ts-ignore
//             const dbOps = await import('./src/dbOps.js');
//             dbOps.redis.close();
//           }
//           done();
//         }, 2000);
//       });
//   });
// });
//
// describe('Redis cache testing', () => {
//   it('second query takes less than half time of first', async (done) => {
//     let firstResTime: number;
//     (await superoak(app))
//       .post('/graphql')
//       .send({ query: '{getBook(id:2){ id title author }}' })
//       .end((err, res) => {
//         // console.log(res);
//         firstResTime = Number(res.header['x-response-time'].slice(0, -2));
//       });
//
//     setTimeout(async () => {
//       (await superoak(app))
//         .post('/graphql')
//         .send({ query: '{getBook(id:2){ id title author }}' })
//         .end((err, res) => {
//           const newTime: number = Number(res.header['x-response-time'].slice(0, -2));
//
//           console.log('firstTime', firstResTime);
//           console.log('newTime', newTime);
//
//           expect(newTime < firstResTime).toBeTruthy();
//           setTimeout(async () => {
//             if (true) {
//               // @ts-ignore
//               const dbOps = await import('./src/dbOps.js');
//               dbOps.redis.close();
//             }
//             done();
//           }, 1000);
//         });
//       if (true) {
//         // @ts-ignore
//         const dbOps = await import('./src/dbOps.js');
//         dbOps.redis.close();
//       }
//     }, 1000);
//   });
// });
