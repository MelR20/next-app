import { db } from "@/index";
import { catsTable } from "@/db/schema";
import { faker } from "@faker-js/faker";

function getCatName() {
    const catName = faker.person.firstName();
    return catName;
}

async function getCatImage(catColor:string, catHairLength:string) {
    
    const catJSON = await fetch(`https://cataas.com/cat/${catColor}?${catHairLength}?position=center&json=true&html=true`);
    const catData = await catJSON.json();
    return catData.url;
}

function getCreationDate() {
    const creationDate = faker.date.between({from: '2022-01-01', to: Date.now()});
    return creationDate;
}

async function getCat(catColor:string, catHairLength:string) {
    const catName = getCatName();
    const image = await getCatImage(catColor, catHairLength);
    const creationDate = getCreationDate();
    const cat = await db.insert(catsTable).values({
        name: catName,
        image: image,
        color: catColor,
        hairLength: catHairLength,
        createdAt: creationDate,
    });
}

const populateDbScript = async () => {
    for (let i = 0; i < 10; i++) {
        await getCat("orange", "shorthair");
        await getCat("orange", "longhair");
        await getCat("black", "shorthair");
        await getCat("black", "longhair");
        await getCat("white", "shorthair");
        await getCat("white", "longhair");
        await getCat("brown", "shorthair");
        await getCat("brown", "longhair");
        await getCat("gray", "shorthair");
        await getCat("gray", "longhair");
        await getCat("tabby", "shorthair");
        await getCat("tabby", "longhair");

    }
};

populateDbScript();
