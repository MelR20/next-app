import { db } from "@/index";
import { catsTable } from "@/db/schema";
import { faker } from "@faker-js/faker";

function getCatName() {
    const catName = faker.person.firstName();
    return catName;
}

async function getCatImage(catColor:string) {
    
    const catJSON = await fetch(`https://cataas.com/cat/${catColor}?position=center&json=true&html=true`);
    const catData = await catJSON.json();
    return catData.url;
}

function getCreationDate() {
    const creationDate = faker.date.between({from: '2022-01-01', to: Date.now()});
    return creationDate;
}

async function getCat(catColor:string) {
    const catName = getCatName();
    const image = await getCatImage(catColor);
    const creationDate = getCreationDate();
    
    if (image){
        const cat = await db.insert(catsTable).values({
            name: catName,
            image: image,
            color: catColor,
            createdAt: creationDate,
        });
    }
}

const populateDbScript = async () => {
    for (let i = 0; i < 25; i++) {
        await getCat("orange");
        await getCat("black");
        await getCat("white" );
        await getCat("brown");
        await getCat("grey");
        await getCat("tabby");

    }
};

populateDbScript();
