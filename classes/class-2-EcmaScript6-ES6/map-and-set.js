const names = new Map()
const objKey = 'john'

names.set(objKey, {
	email: 'john@doe.com',
	name: 'John',
})
names.set('kent', { email: 'kent@kodi.com', name: 'Kent' })

if (names.has(objKey)) {
	console.log(names.get(objKey))
}