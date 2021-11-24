const { randomUUID } = require('crypto'); 


const personsDB = [
{
	id : '89da7309-e5ed-48a4-b4e6-ae47c947ae12',
	name : 'Sergey Lubimov',
	age: 27,
	hobbies : ['swimming','coding','dancing']
},
]

function arrayEquals(a, b) {
return Array.isArray(a) &&
Array.isArray(b) &&
a.length === b.length &&
a.every((val, index) => val === b[index]);
}

exports.findAllPersons = (array = personsDB) =>{
return JSON.stringify(array)
};

const findPersonById = (id, array) => {

	let obj = array.find(o => o.id === id);

	return obj ? obj : {};
};

const createPerson = (name, age, hobbies, array) =>{

	if ( (name || age || hobbies) === undefined) { return false }

		array.push({'id': 'randomUUID()', 'name' : name, 'age': age, 'hobbies': hobbies});
		
		return true;

};

const updatePerson = (id, name, age, hobbies, array) =>{

	let obj = array.find(x => x.id === id);
	
	let index = array.indexOf(obj);

		if (name !== obj.name) { obj.name = name };
		if (age !== obj.age) { obj.age = age };
		if (!arrayEquals(hobbies, obj.hobbies)) { obj.hobbies = hobbies }

return array;
};

const deletePerson = (id, array) =>{

	let obj = array.find(x => x.id === id);
	
	let index = array.indexOf(obj);

	array.splice(index,1);

return true;
};

//module.exports = { findAllPersons, findPersonById, createPerson, updatePerson, deletePerson}
//
////let resault = findPersonById('89da7309-e5ed-48a4-b4e6-ae47c947ae12', personsDB);
//
//let resault = createPerson('Bill Gates', 79, ['houskiping','computers', 'yahting'], personsDB)
//
//console.log('Before update', findAllPersons(personsDB));
//
//resault = updatePerson('randomUUID()', 'Bill Gates Clver Man', 179, ['houskiping','golf', 'yahting'], personsDB)
//
//console.log('After update', findAllPersons(personsDB));
//
//resault = deletePerson('randomUUID()', personsDB)
//
//console.log('After delete', findAllPersons(personsDB));

///console.log(resault)

//console.table(personsDB)


//resault = findPersonById('89da7309-e5ed-48a4-b4e6-ae47c947ae12', personsDB);

