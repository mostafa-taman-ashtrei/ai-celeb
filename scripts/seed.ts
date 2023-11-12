const { PrismaClient } = require("@prisma/client");

const db = new PrismaClient();

async function main() {
    try {
        await db.category.createMany({
            data: [
                { name: "Famous People" },
                { name: "Movies & TV" },
                { name: "Musicians" },
                { name: "Philosophers" },
                { name: "Scientists" },
                { name: "Historical Figures" },
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