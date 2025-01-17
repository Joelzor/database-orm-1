const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

async function seed() {
	const createdCustomer = await prisma.customer.create({
		data: {
			name: "Alice",
		},
	});

	console.log("Customer created", createdCustomer);

	// Add your code here

	const createdContact = await prisma.contact.create({
		data: {
			phone: "07231234124",
			email: "Alice@email.com",
			customer: {
				connect: {
					id: createdCustomer.id,
				},
			},
		},
	});

	const createCustomerWithContact = await prisma.customer.create({
		data: {
			name: "Bob Tables",
			contact: {
				create: {
					phone: "07876543210",
					email: "bob@tables.com",
				},
			},
		},
	});

	const createdMovie = await prisma.movie.create({
		data: {
			title: "The Godfather",
			runtimeMins: 175,
		},
	});

	const createdScreen = await prisma.screen.create({
		data: {
			screenNumber: 3,
		},
	});

	const createdScreening = await prisma.screening.create({
		data: {
			startsAt: 1500,
			movie: {
				connect: {
					id: createdMovie.id,
				},
			},
			screen: {
				connect: {
					id: createdScreen.id,
				},
			},
		},
	});

	const createMovieWithScreenings = await prisma.movie.create({
		data: {
			title: "Scarface",
			runtimeMins: 170,
			screenings: {
				create: [
					{
						startsAt: 2000,
						screen: {
							connect: {
								id: createdScreen.id,
							},
						},
					},
					{
						startsAt: 1800,
						screen: {
							connect: {
								id: createdScreen.id,
							},
						},
					},
				],
			},
		},
	});

	const createTicketWithCustomerAndScreening = await prisma.ticket.create({
		data: {
			customer: {
				connect: {
					id: createdCustomer.id,
				},
			},
			screening: {
				connect: {
					id: createdScreening.id,
				},
			},
		},
	});

	// Don't edit any of the code below this line
	process.exit(0);
}

seed().catch(async (error) => {
	console.error(error);
	await prisma.$disconnect();
	process.exit(1);
});
