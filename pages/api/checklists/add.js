// import { connectToDatabase } from "../../../util/mongodb";


// /**
//  * Method to standardize creating text
//  * @param {string} text
//  * @param {boolean} isComplete
//  * @param {number} minTimeFromTarget  
//  * @param {number} maxTimeFromTarget  
//  */

// function createListItem(text="", isComplete=false, minTimeFromTarget=0, maxTimeFromTarget=0){
//     return {
//         text,
//         isComplete,
//         minTimeFromTarget,
//         maxTimeFromTarget
//     };
// }

// /**
//  * Method to standardize creating a list
//  * @param {string} name
//  * @param {string} targetDate 
//  * @param {item[]} items  
//  */

// function createList(name="Example List", targetDate="2022-01-01T00:00:00", items =[]){
//     return {
//         name,
//         targetDate,
//         items
//     }
// }


// // POST request to this route to add an empty checklist item
// export default async (req, res) => {
//   const { db } = await connectToDatabase();

//   if(!req || req.method !== 'POST' || !req.body){
//       throw new Error("Tried /api/addEmpty without a POST request")
//   }

//   // Grab post parameters
//   const {name, targetDate, items} = req.body;

//   // find if there is a checklist 
//   const filter = {name};
//   const replacement = {
//       name,
//       targetDate, 
//       items
//   }

//   // 
//   const options = {
//       upsert: true;
//   }


//   const result = await db
//     .collection("emptyChecklists")
//     .replaceOne(filter, replacement, options);
  
//     res.json(result);
// };


