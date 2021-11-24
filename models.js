const { v4: uuidv4 } = require('uuid');


const personsDB = [
{
	id : '89da7309-e5ed-48a4-b4e6-ae47c947ae12',
	name : 'Sergey Lubimov',
	age: 27,
	hobbies : ['swimming','coding','dancing']
}
]

function arrayEquals(a, b) {
return Array.isArray(a) &&
Array.isArray(b) &&
a.length === b.length &&
a.every((val, index) => val === b[index]);
}

exports.findAllPersons = (array = personsDB) =>{

return JSON.stringify(array);

};

exports.findPersonById = (id, array = personsDB) => {

	let obj = array.find(o => o.id === id);

	return obj ? JSON.stringify(obj) : undefined;
};

exports.createPerson = (name, age, hobbies, array = personsDB) =>{

		let newPerson = {'id': uuidv4(), 'name' : name, 'age': age, 'hobbies': hobbies};

		array.push(newPerson);
		
		return { resault: true, data: newPerson};

};

exports.updatePerson = (id, name, age, hobbies, array = personsDB) =>{

	let obj = array.find(x => x.id === id);
	
	let index = array.indexOf(obj);

		if (name !== obj.name) { obj.name = name };
		if (age !== obj.age) { obj.age = age };
		if (!arrayEquals(hobbies, obj.hobbies)) { obj.hobbies = hobbies }

return array[index];
};

exports.deletePerson = (id, array = personsDB) =>{

	let obj = array.find(x => x.id === id);
	
	let index = array.indexOf(obj);

	array.splice(index,1);

return true;
};