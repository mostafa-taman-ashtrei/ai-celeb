const { PrismaClient } = require("@prisma/client");

const db = new PrismaClient();

async function main() {
    try {
        await db.category.createMany({
            data: [
                { name: "Athletes" },
                { name: "Directors / Actors" },
                { name: "Musicians" },
                { name: "Philosophers" },
                { name: "Scientists" },
                { name: "Historical Figures" },
                { name: "Fictional Characters" },
                { name: "World Leaders" },
            ],
        });

    } catch (error) {
        // eslint-disable-next-line no-console
        console.log(error);
    } finally {
        await db.$disconnect();
    }
}

main();