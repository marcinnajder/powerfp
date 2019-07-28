export { cons, empty, List_cons, List_empty } from "./adt.generated";

export type List<T> =
    | { type: "cons"; head: T; tail: List<T> }
    | { type: "empty" };






// export function cons<T>(head: T, tail: List<T>): List<T> {
//     return { type: "cons", head, tail };
// }
// export function empty<T>(): List<T> {
//     return { type: "empty" };
// }



// var a: Readonly<{}>;
// const list = cons(10, cons(20, empty())); 	// -> [10, 20]
// // po dodaniu nowego elementu, nowa lista wspoldzieli strukture ze stara lista
// const newList = cons(0, list); 			// -> [0, 10, 20]

//console.log(toArray(newList));

// function toArray<T>(list: List<T>): Array<T> {
// 	switch(list.type){
// 		case "cons": return [list.head, ...toArray(list.tail)];
// 		case "empty": return [];
// 	}
// }



//https://fsharpforfunandprofit.com/posts/recursive-types-and-folds-3/#linkedlist
//https://fsharpforfunandprofit.com/posts/recursive-types-and-folds-3b/#tree

// type Tree<'a> = 
// | E 
// | T of Tree<'a> * 'a * Tree<'a>// data List a = Nil
//             | Cons a (List a)