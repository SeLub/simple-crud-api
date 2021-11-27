import { v4 as uuidv4 } from 'uuid';

const personsDB = undefined;
//[
//{
//	id : '89da7309-e5ed-48a4-b4e6-ae47c947ae12',
//	name : 'Sergey Lubimov',
//	age: 27,
//	hobbies : ['swimming','coding','dancing']
//}
//];

const notArrayError = (message = 'In-mamory DataBase mast be array.') => { throw new Error(message); };

const arrayEquals = (a, b) => { return Array.isArray(a) && Array.isArray(b) && a.length === b.length && a.every((val, index) => val === b[index]); }

const findAllPersons = (array = personsDB) => {

	if (Array.isArray(array)) { return JSON.stringify(array); } else { notArrayError(); };

};

const findPersonById = (id, array = personsDB) => {

	if (Array.isArray(array)) {

		let obj = array.find(o => o.id === id);

		return obj ? JSON.stringify(obj) : undefined;

	} else { notArrayError(); };

};

const createPerson = (name, age, hobbies, array = personsDB) =>{

	if (Array.isArray(array)) {

		let newPerson = {'id': uuidv4(), 'name' : name, 'age': age, 'hobbies': hobbies};

		array.push(newPerson);
		
		return { resault: true, data: newPerson};

	} else { notArrayError(); };

};

const updatePerson = (id, name, age, hobbies, array = personsDB) =>{

	if (Array.isArray(array)) {

		let obj = array.find(x => x.id === id);
	
		let index = array.indexOf(obj);

		if (name !== obj.name) { obj.name = name };
		if (age !== obj.age) { obj.age = age };
		if (!arrayEquals(hobbies, obj.hobbies)) { obj.hobbies = hobbies }

		return array[index];
	
	} else { notArrayError(); };

};

const deletePerson = (id, array = personsDB) =>{

	if (Array.isArray(array)) {

		let obj = array.find(x => x.id === id);
	
		let index = array.indexOf(obj);

		array.splice(index,1);
		
	} else { notArrayError(); }

return true;
};

export { findAllPersons, findPersonById, createPerson, updatePerson, deletePerson };