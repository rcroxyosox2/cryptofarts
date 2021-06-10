// FUCK YOU GREEDY GOOGLE FUCKS

// export const batchUpdateDBFromCoinsResponse = (coins) => {

//   const [pumps, dumps] = getPumpsAndDumpsFromArr({coins, qty: 50});
//   const pumpsAndDumps = [...pumps, ...dumps];
//   const totalChangeFromCoinsResponse = getTotalChangeFromCoinsResponse(coins);
//   if (!pumps || !dumps) {
//     console.log('pumps and dumps not got. here are the results', pumps, dumps);
//   }

//   return writeCoinsToDB('coins', pumpsAndDumps)
//   .then(writeToDB('stats', 'coinFetchStats', {
//     totalChange: totalChangeFromCoinsResponse,
//     lastUpdated: firebase.firestore.FieldValue.serverTimestamp(),
//   }))
// }

// export const writeToDB = (collection, doc, value) => {
//   var collectionRef = db.collection(collection);
//   return collectionRef.doc(doc).set(value);
// }

// export const writeCoinsToDB = (collection, arr) => {
//   var collectionRef = db.collection(collection);
//   var batch = db.batch();
//   arr.forEach((coin) => {
//     const doc = collectionRef.doc(coin.id);
//     batch.set(doc, coin);
//   });
//   return batch.commit()
//   .catch(e => {
//     console.log(e);
//   })
// }

// export const getCoinsFromDB = () => {
//   return coinsRef
//   .get()
//   .then((querySnapshot) => {
//     const coins = querySnapshot.docs.map(doc => doc.data());
//     return coins;
//   })
//   .catch((error) => {
//       console.log("Error getting documents: ", error);
//   });
// }

// export const getStatFromDB = (stat) => {
//   var statsDoc = statsRef.doc("coinFetchStats");

//   return statsDoc.get().then((doc) => {
//       if (doc.exists) {
//           const data = doc.data();
//           return data[stat];
//       } else {
//           // doc.data() will be undefined in this case
//           console.log("No such document!");
//       }
//   }).catch((error) => {
//       console.log("Error getting document:", error);
//   });
// }