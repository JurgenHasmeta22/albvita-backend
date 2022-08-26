import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient({
    log: ['query', 'info', 'warn', 'error'],
});

const productsJson = `{
    "items": [
        {
            "id": 1,
            "name": "Animal Pak Powder",
            "price": "55",
            "image": "/images/animal-pak-powder.png",
            "stock": 7,
            "categoryId": 1,
            "description": "The True Original since 1983, Animal Pack was developed to meet the needs of the world's most extreme athletes as well as the most extreme training sessions. The Ultimate Training Package is much more than just a multivitamin, but it is the credible, courageous foundation on which the most dedicated weightlifters and extreme athletes have built their diets."
        },
        {
            "id": 2,
            "name": "Artichoke Premium",
            "price": "10",
            "image": "/images/artichoke-premium.jpg",
            "stock": 5,
            "categoryId": 1,
            "description": "Artichoke Premium is a supplement containing high quality artichoke extracts with 5% standardized cinnar content.Research has shown that the extract of artichoke leaves:Helps in detoxification"
        },
        {
            "id": 3,
            "name": "Argi Power 1500 Mega Caps",
            "price": "30",
            "image": "/images/argi-power.jpg",
            "stock": 5,
            "categoryId": 4,
            "description": "Argi Power 1500 Mega Caps, mega capsules contain 1500 mg L-Arginine with the highest pharmaceutical quality in one capsule. How does L-Arginine HCl work and what is it used for? L-arginine is a dietary supplement that participates in many processes of formation of substances in the body: eg nitric oxide. Furthermore it provides the formamide group that serves in creatine biosynthesis."
        },
        {
            "id": 4,
            "name": "Beta-Alanine Xplode Powder",
            "price": "28",
            "image": "/images/beta-alanine.jpg",
            "stock": 5,
            "categoryId": 4,
            "description": "Beta-Alanine Xplode Powder supplement is a preparation in the form of a powder with perfect solubility, which contains very high quality Beta-Alanine, enriched with vitamin B6 and L-Histidine."
        },
        {
            "id": 5,
            "name": "Dymatize Elite 100 % Whey",
            "price": "65",
            "image": "/images/Chocolate-Fudge.jpg",
            "stock": 3,
            "categoryId": 8,
            "description": "The perfect whey protein anytime! Are you looking for a high value whey protein? Whether you seek to support muscle growth after an intense workout or simply seek to increase your daily protein intake."
        },
        {
            "id": 6,
            "name": "ON Gold Standard 100% Whey",
            "price": "85",
            "image": "/images/gold-standard.jpg",
            "stock": 6,
            "categoryId": 8,
            "description": "Gold Standard 100% Whey is considered the best whey protein in the world based on its combination of flavor, high protein content, and easy digestion. Gold Standard 100% Whey contains whey isolated protein, or WPI. Rated with over 90% pure protein, WPI is known as the highest quality ingredient."
        },
        {
            "id": 7,
            "name": "BSN True Mass 1200",
            "price": "75",
            "image": "/images/bsn-true-mass.png",
            "stock": 4,
            "categoryId": 7,
            "description": "TRUE-MASS® 1200 contains the unique ultra premium protein formula to nourish an athlete's muscles with the essential building blocks of protein. The unique mix of carbohydrates provides the caloric support needed to support extreme physical activity, helping the body prepare as well as supporting regeneration from intense exercise. Carbohydrates and fats provide energy that burns quickly during strenuous physical activity"
        },
        {
            "id": 8,
            "name": "Gain Bolic 6000G",
            "price": "19",
            "image": "/images/gain-bolic.jpg",
            "stock": 10,
            "categoryId": 7,
            "description": "It is a mixture of carbohydrates with different glycemic index with protein complexes that help increase muscle mass, enriched with carefully selected portions of creatine monohydrate and taurine. Creatine use helps increase physical capacity during short,high-intensity workouts. "
        },
        {
            "id": 9,
            "name": "Animal M Stak",
            "price": "64",
            "image": "/images/animal-m-stak.png",
            "stock": 6,
            "categoryId": 3,
            "description": "What is Animal M-Stak? A natural, non-hormonal supplement designed for the most stubborn of all hard-gainers, from beginners to diehards themselves, we've been through it all. You can not gain another pound, the workouts are stagnant, the weights are static. This is hard-gainer syndrome, and from the thinnest ectomorphs to the most muscular endomorph, we’ve all been there."
        },
        {
            "id": 10,
            "name": "BCAA X",
            "price": "17",
            "image": "/images/bcaa-x.jpg",
            "stock": 8,
            "categoryId": 4,
            "description": "Branched chain amino acids (BCAAs) are an important group of essential amino acids consisting of Leucine, Isoleucine and Valine. BCAAs are among the nine essential amino acids for humans because our bodies cannot produce them."
        },
        {
            "id": 11,
            "name": "Beta Carotene",
            "price": "12",
            "image": "/images/beta-carotene.jpg",
            "stock": 5,
            "categoryId": 1,
            "description": "In nature, Beta Carotene is the precursor of vitamin A (inactive form). Plant carotenoids are the main dietary source of provitamin A.One molecule of Beta Carotene can be broken down by an intestinal enzyme into two molecules of Vitamin A."
        },
        {
            "id": 12,
            "name": "Daily Vitamin",
            "price": "20",
            "image": "/images/daily-vitamin.jpg",
            "stock": 0,
            "categoryId": 1,
            "description": "Daily Vita-Min is an advanced multi-vitamin and mineral formula with 27 active ingredients! It contains a complex of B vitamins, vitamin C and a higher level of Vitamin D (up to 1000% NRV), plus essential minerals including Selenium, Zinc and Chromium."
        },
        {
            "id": 13,
            "name": "MuscleTech Nitro Tech",
            "price": "86",
            "image": "/images/muscle-tech.jpg",
            "stock": 2,
            "categoryId": 8,
            "description": "NITRO-TECH® is a scientifically created whey protein formula that improves with the most studied form of creatine for results and better muscle and strength. It also contains whey protein, which is the most popular type of protein."
        },
        {
            "id": 14,
            "name": "Scitec 100 % Kompleks Casein",
            "price": "32",
            "image": "/images/scitec.jpg",
            "stock": 1,
            "categoryId": 8,
            "description": "100% Casein Complex is a blend of milk proteins with predominant micellar casein, exclusively from caseit milk proteins. Casein is rich in branched-chain essential amino acids (BCAAs) and has a very high content (more than serum) of L-glutamine, the most abundant free-form amino acid in human blood."
        },
        {
            "id": 15,
            "name": "Blackweiler Shred",
            "price": "40",
            "image": "/images/blackweiler-shred.jpg",
            "stock": 0,
            "categoryId": 5,
            "description": "You will feel the dark power of BLACKWEILER SHRED, which will illuminate you from within. Nothing can stop you now before you undergo the best training in your life! You stand together, you and your new ally in the fight to build your dreams. Remember one thing - you will not be prepared for what will happen now! Your muscles will fill with blood, your body will burst into sweat and your mind will open up to new sensations!"
        },
        {
            "id": 16,
            "name": "L-carnitine 1500 extreme mega caps",
            "price": "45",
            "image": "/images/carnitine.jpg",
            "stock": 3,
            "categoryId": 6,
            "description": "1000 mg L- Carnitine in its purest form which transports free fatty acids to the mitochondria where the oxygenation process takes place."
        },
        {
            "id": 17,
            "name": "Scitec Shredex",
            "price": "35",
            "image": "/images/shredex.jpg",
            "stock": 5,
            "categoryId": 6,
            "description": "SHREDEX is a stimulant, Sinefirine for weight loss and body management. It provides 16 ingredients, including L-Carnitine, Hydroxycitric Acid (HCA) from Garcinia Cambodia extract and Epigalocatechin galate (EGCG) from Green Tea Extract and contributes to body weight control and hunger."
        },
        {
            "id": 18,
            "name": "Scitec Restyle",
            "price": "30",
            "image": "/images/restyle.jpg",
            "stock": 4,
            "categoryId": 6,
            "description": "When you want to get in better shape, you need to reform your life: your eating habits and your level of physical activity. When you do, we suggest you get our ReStyle formula too! It is a complex of 12 ingredients, stimulus of body weight and body management."
        },
        {
            "id": 19,
            "name": "Caffeine 100 Caps",
            "price": "10",
            "image": "/images/cafeine.jpg",
            "stock": 6,
            "categoryId": 6,
            "description": "Coffee has hundreds of chemical ingredients in it, some of which can counteract the positive effects of caffeine. However, with pure caffeine, the desired doses can be obtained without any possible hindrance. Our caffeine capsules allow an efficient, accurate and high-dose use."
        },
        {
            "id": 20,
            "name": "Creatine monohydrate powder",
            "price": "25",
            "image": "/images/creatine-powder.jpg",
            "stock": 1,
            "categoryId": 2,
            "description": "Creatine monohydrate powder is a supplement that aims to meet the expenditures that come from intense muscular exercise, especially in athletes. This product delivers a pure pharmaceutical grade monohydrate creatine."
        },
        {
            "id": 21,
            "name": "MuscleTech Platinum 100% Creatine",
            "price": "30",
            "image": "/images/muscletech-platinum.jpg",
            "stock": 2,
            "categoryId": 2,
            "description": "Ultra-pure micronized creatine that helps define defined muscle growth!Pure creatine monohydrate powder"
        },
        {
            "id": 22,
            "name": "Scitec 100% Creatine Monohydrate",
            "price": "15",
            "image": "/images/scitec-creatine.jpg",
            "stock": 4,
            "categoryId": 2,
            "description": "Creatine is an organic nitric acid that occurs in vertebrates. Approximately 95% of creatine in the body is found in skeletal muscle. It helps supply energy to all cells, mainly muscles, by increasing the formation of Adenosine TriPhosphate (ATP) which acts as a cellular energy reserve, for muscle contractions."
        },
        {
            "id": 23,
            "name": "Scitec Jumbo",
            "price": "90",
            "image": "/images/jumbo.jpg",
            "stock": 1,
            "categoryId": 7,
            "description": "It has been proven that people overestimate their current nutrient intake when trying to gain muscle mass. In other words, they eat less than they think they need sustainable and significant progress!"
        },
        {
            "id": 24,
            "name": "ON Serious Mass",
            "price": "90",
            "image": "/images/seriousmass.jpg",
            "stock": 3,
            "categoryId": 7,
            "description": "A serious weight gain requires serious calories. However, those who need extra calories often find it difficult to consume those calories. For those who aspire to be bigger but who have a very active metabolism or have little appetite make consuming enough calories just through whole foods a real challenge. With SERIUOS MAS, you will have nothing to lose and much to gain."
        },
        {
            "id": 25,
            "name": "MuscleTech Mass Tech Extreme 2000",
            "price": "70",
            "image": "/images/extreme.jpg",
            "stock": 4,
            "categoryId": 7,
            "description": "Bodybuilders and weightlifters are always looking for a supplement to help them break the doors of size game. Whether you are stuck in a frustrating mass building program or just have a hard time building muscle mass, you now have a help to break your blockade. It is called MASS-TECH EXTREME 2000!"
        },
        {
            "id": 26,
            "name": "Tribusterone 90",
            "price": "30",
            "image": "/images/tribusteron.jpg",
            "stock": 2,
            "categoryId": 3,
            "description": "Contains an aqueous, powdered extract of a plant root.Source of plant steroids, alkaloids and flavonoids."
        },
        {
            "id": 27,
            "name": "Stanabol X",
            "price": "45",
            "image": "/images/stanabol-X.jpg",
            "stock": 8,
            "categoryId": 3,
            "description": "Stanabol - X is a synergistic complex of 25 known anabolic substrates, Anabolic Stack modulates testosterone and other anabolic hormones such as insulin, growth hormone HGH and IGF-1 and thyroid hormones T3 and T4."
        },
        {
            "id": 28,
            "name": "Testo Punch",
            "price": "35",
            "image": "/images/testo-punch.jpg",
            "stock": 6,
            "categoryId": 3,
            "description": "TESTO PUNCH is an ultra-sophisticated, comprehensive matrix of Testosterone, Estrogen and Libido, with 12 powerful carefully selected ingredients! In addition to DAA (D-Aspartic Acid) and herbal ingredients - including Maca - it provides important vitamins and minerals!"
        },
        {
            "id": 29,
            "name": "Scitec  100% Peanut Butter",
            "price": "22",
            "image": "/images/scitec-100-peanut-butter.jpg",
            "stock": 5,
            "categoryId": 8,
            "description": "100% PEANUT BUTTER is made from blanched, clean and healthy argentinian arachid peanuts and it is a natural source of protein, carbs and fats. The mono and polyunsaturated fats within 100% PEANUT BUTTER make it great for athletes concerned with maintaining a heart healthy and balanced diet. Replacing saturated fats with unsaturated fats in the diet contributes to the maintenance of normal blood cholesterol levels. R"
        },
        {
            "id": 30,
            "name": "Scitec 100% Whey Isolate",
            "price": "65",
            "image": "/images/whey-isolate.jpg",
            "stock": 5,
            "categoryId": 8,
            "description": "100% Whey Isolate is an excellent quality whey protein isolated and fortified with the fastest absorption hydrolysis of whey. This formula is lower in carbohydrates than ever before!"
        },
        {
            "id": 31,
            "name": "Scitec Super Hero",
            "price": "40",
            "image": "/images/scitec-super-hero.jpg",
            "stock": 15,
            "categoryId": 5,
            "description": "SUPERHERO është një produkt i ri pre-workout revulucionar nga SCITEC në linjën e saj professional! Me përbërës të pa-përdorur më parë, duke përfshirë aktive me cilësi të lartë, SUPERHERO është formula më e lartë që duhet të provoni!"
        },
        {
            "id": 32,
            "name": "Scitec Taurine",
            "price": "10",
            "image": "/images/scitec-taurine.jpg",
            "stock": 10,
            "categoryId": 4,
            "description": "Taurina gjendet natyrshëm në ushqimet me origjinë shtazore, por praktikisht mungon në ushqimet me origjinë bimore. Prandaj nivelet e Taurinës mund të jenë më të ulëta në një individ vegjetarian sesa tek një grup individësh me një dietë standarde të balancuar."
        },
        {
            "id": 33,
            "name": "Scitec T360",
            "price": "32",
            "image": "/images/scitec-t-360.jpg",
            "stock": 5,
            "categoryId": 3,
            "description": "Arginina është pararendësi i oksidit nitrik (ON). Formula jonë T-360 përmban gjithashtu L-Karnitinë, AçetiI L-Karnitine si dhe L-Karnitinë L-Tartrate. Zinku kontribuon në ruajtjen e niveleve normale të testosteronit, fertilitetit normal, riprodhimit, si dhe sintezës normale të proteinave *. Ky kombinim përbërësish e bën T-360-n shumë popullor, sidomos në mesin e meshkujve dhe në mesin e atyre që stërviten fortë.* Këto deklarata janë vërtetuar shkencërisht nga Autoriteti Evropian i Sigurisë Ushqimore (EFSA) dhe i autorizuar nga Komisioni Evropian (KE)."
        },
        {
            "id": 34,
            "name": "Scitec Shredex",
            "price": "35",
            "image": "/images/scitec-shredex.jpg",
            "stock": 18,
            "categoryId": 6,
            "description": "SHREDEX është një stimulues, Sinefirine për rënie dhe menaxhimi të peshës së trupit. Ai siguron 16 përbërës, duke përfshirë L-Karnitinë, Acid Hydroksicitrik (HCA) nga ekstrakti i Garcinia kamboxhia dhe Epigalokatekin galate (EGCG) nga Ekstrakti i Çajit të Gjelbër dhe kontribuonë në kontrollin e peshës trupore dhe urisë. SHREDEX përmban Kromin që kontribuon në metabolizmin normal makronutrient dhe në ruajtjen e niveleve normale të glukozës në gjak. * * Këto deklarata janë vërtetuar shkencërisht nga Autoriteti Evropian i Sigurisë Ushqimore (EFSA) dhe autorizuar nga Komisioni Evropian (KE)."
        },
        {
            "id": 35,
            "name": "Thermo x",
            "price": "75",
            "image": "/images/scitec-thermo-x.jpg",
            "stock": 12,
            "categoryId": 6,
            "description": "THERMO-X është një stimulues kompleks i menaxhimit të peshës së trupit pa efedrinë si dhe i butë në kafeinë. Ai siguron disa përbërës, duke përfshirë Acidin Hidroksicitrik (HCA) nga Ekstrakti Garcinia Kamboxhia, që kontribuon në kontrollin e peshës trupore dhe ndjenjës së urisë."
        },
        {
            "id": 36,
            "name": "Scitec Turbo Ripper",
            "price": "25",
            "image": "/images/scitec-turbo-ripper.jpg",
            "stock": 2,
            "categoryId": 6,
            "description": "High doses of sustained release caffeine, acetyl l-carnitine, green tea, synephrine & more! TURBO RIPPER gives you many of the ingredients you know and love – in significant doses! We have L-Carnitine and not just ordinary L-Carnitine, but the more complex Acetyl L-Carnitine (ALC) in a whopping dose – you probably won’t want to take Carnitine separately!"
        },
        {
            "id": 37,
            "name": "Scitec Tyrosine",
            "price": "12",
            "image": "/images/scitec-tyrosine.jpg",
            "stock": 13,
            "categoryId": 4,
            "description": "L-Tyrosine is a conditionally essential amino acid, which occurs naturally in foods, mainly as part of proteins. It is one of the 22 amino acids that are used by cells to synthesize proteins. Dietary L-Tyrosine is provided by mixed dietary protein intakes from different sources and it can also be consumed in the form of supplements. It’s popular among athletes to take pure L-Tyrosine before workouts, especially with Caffeine."
        },
        {
            "id": 38,
            "name": "Selenium",
            "price": "8",
            "image": "/images/selenium.jpg",
            "stock": 4,
            "categoryId": 4,
            "description": "Selenium is an essential micronutrient for humans and it contributes to normal spermatogenesis, the maintenance of normal hair and nails, normal function of the immune system and normal thyroid function, and also to the protection of cells from oxidative stress*. *These statements have been scientifically proven by the European Food Safety Authority (EFSA) and authorized by the European Commission (EC)."
        },
        {
            "id": 39,
            "name": "Shark Cartilage",
            "price": "15",
            "image": "/images/kërce-peshkaqeni.jpg",
            "stock": 1,
            "categoryId": 4,
            "description": "This formula contains shark cartilage powder. It is a natural source of Chondroitin Sulfate. Each serving delivers 2960 mg shark cartilage powder. Manganese contributes to the maintenance of normal bones and to the normal formation of connective tissue. These statements have been scientifically proven by the European Food Safety Authority (EFSA) and authorized by the European Commission (EC)."
        },
        {
            "id": 40,
            "name": "Shaker 750 ml",
            "price": "5",
            "image": "/images/shaker.jpg",
            "stock": 25,
            "categoryId": 8,
            "description": "Shake is a product made by our company"
        },
        {
            "id": 41,
            "name": "Ashwagandha Premium",
            "price": "35",
            "image": "/images/09.jpg",
            "stock": 10,
            "categoryId": 4,
            "description": "Ashwagandha Premium  është një suplement dietik në kapsula, që përmban ekstrakte të rrënjës Ashwagandha (Withania somnifera L.). Ashwagandha ka një efekt të dobishëm në ndërtimin e rezistencës së trupit ndaj faktorëve të stresit."
        },
        {
            "id": 42,
            "name": "Super Guarana",
            "price": "12",
            "image": "/images/super-guarana.jpg",
            "stock": 5,
            "categoryId": 4,
            "description": "Guarana is a natural, herbal source of Caffeine and other phytochemicals. It’s seeds contain about twice the concentration of Caffeine found in coffee beans. Guarana contains widely varying mixtures of xanthine alkaloids other than Caffeine, including Theophylline and Theobromine and other substances such as polyphenols. It has traditionally been used as a refresher. Our SUPER GUARANA also provides Calcium that contributes to normal energy-yielding metabolism, normal muscle function and neurotransmission, the maintenance of normal bones and teeth"
        },
        {
            "id": 43,
            "name": "Scitec Intra Edge",
            "price": "45",
            "image": "/images/edge.jpg",
            "stock": 7,
            "categoryId": 8,
            "description": "Our INTRA EDGE intra-workout formula is based on pure Cluster Dextrin® branded highly branched cyclic dextrin carbohydrate, which is a new type of dextrin that is produced from amylopectin. Cluster Dextrin® is highly soluble in water and the solution is highly stable during storage. Cluster Dextrin® contributes little to osmotic pressure meaning that it is absorbed very fast without negative intestinal problems."
        },
        {
            "id": 44,
            "name": "Scitec Jumbo",
            "price": "55",
            "image": "/images/scitec-jumbo-4400g-500x500.jpg",
            "stock": 20,
            "categoryId": 8,
            "description": "It’s been shown that people tend to overestimate their actual nutrient consumption when trying to gain muscle and brawn. In other words, they eat less than they think and they need for steady and significant progress!"
        },
        {
            "id": 45,
            "name": "Scitec Liquid CarniX 100 000",
            "price": "25",
            "image": "/images/scitec-liquid-carni-x-100-000.jpg",
            "stock": 1,
            "categoryId": 2,
            "description": "LIQUID CARNI-X 100 000 provides 2500 mg of L-carnitine per serving in a popular liquid form. Being a source of Vitamin C, it provides 225% of the official Nutrient Reference Value. Vitamin C contributes to normal energy-yielding metabolism."
        },
        {
            "id": 46,
            "name": "Scitec Mega Arginine 120 Caps",
            "price": "25",
            "image": "/images/scitec-mega-arginine-120-caps.jpg",
            "stock": 4,
            "categoryId": 4,
            "description": "L-arginine is a conditionally essential amino acid, that is, under normal circumstances the human body can synthesize it to satisfy their needs. In the case of poor nutrition or intense physical exercise, the biosynthetic pathway can not produce sufficient amounts of arginine, therefore, a part must be supplemented with diet or supplements."
        },
        {
            "id": 47,
            "name": "Scitec Lysine",
            "price": "10",
            "image": "/images/scitec-lysine.jpg",
            "stock": 7,
            "categoryId": 4,
            "description": "L-Lysine is an essential amino acid that’s a physiological building block for the proteins in the body and it is found in large amounts in muscle tissue. The 9 essential amino acids the body cannot synthesize and must be supplied by the diet, including sport supplements."
        },
        {
            "id": 48,
            "name": "Scitec 100% Hydrolyzed Whey Protein",
            "price": "35",
            "image": "/images/scitec-100-hydrolyzed-whey-protein.jpg",
            "stock": 5,
            "categoryId": 8,
            "description": "Whey protein is generally considered the best sports nutrition protein type. Whey concentrates and isolates represent varying degrees of processing and quality, but the protein remains intact, while hydrolyzation breaks intact protein into smaller parts, therefore the speed of digestion, absorption and utilization is the highest among all protein types! This ultra fast absorption makes hydrolyzed whey protein the best after training (or in between multiple daily sessions) and first thing in the morning"
        },
        {
            "id": 49,
            "name": "Scitec 100% L Glutamine",
            "price": "30",
            "image": "/images/l-glutamine-scitec.jpg",
            "stock": 7,
            "categoryId": 2,
            "description": "Glutamine is the most abundant amino acid in the human blood. Glutamine may become conditionally essential in certain situations, including intensive physical training, when the body cannot meet its needs by synthesizing glutamine. This conditionally essential amino acid can be provided by dietary protein intake, including by food supplements."
        },
        {
            "id": 50,
            "name": "Scitec 100% Plant Protein",
            "price": "22",
            "image": "/images/scitec-100-plant-protein.jpg",
            "stock": 25,
            "categoryId": 8,
            "description": "Pea protein is among the top plant proteins regarding nutritional value. According to scientifi­c fi­ndings the essential amino acid profi­le makes it ideal for human consumption. The occurrence of special aminos relevant to sports nutrition is exceptional. With great Glutamine, Lysine and BCAA content it’s comparable even to whey protein, while in Arginine it is outstanding, much better than whey! Digestive retention of pea protein is very high, human studies revealed around 98% digestibility rate. As a plus, this protein suppresses hunger e‑fficiently by its slow digestion and by acting directly on satiety factors"
        }
    ]
}`;

const users = [
    {
        id: 1,
        userName: 'avenger22',
        email: 'jurgenhasmeta@email.com',
        fullName: 'Jurgen Hasmeta',
        password: bcrypt.hashSync('jurgen123', 8),
    },
    {
        id: 2,
        userName: 'brajan06',
        email: 'brajan@email.com',
        fullName: 'Brajan Hasmeta',
        password: bcrypt.hashSync('brajan123', 8),
    },
];

const productsObject = JSON.parse(productsJson);
const products = productsObject.items;

const categories = [
    {
        id: 1,
        name: 'Multivitamins',
    },
    {
        id: 2,
        name: 'Creatine',
    },
    {
        id: 3,
        name: 'Testosterone Boosters',
    },
    {
        id: 4,
        name: 'Aminoacids',
    },
    {
        id: 5,
        name: 'Pre Workouts',
    },
    {
        id: 6,
        name: 'Weight Burner',
    },
    {
        id: 7,
        name: 'Weight Gainers',
    },
    {
        id: 8,
        name: 'Proteins',
    },
];

const orders = [
    {
        id: 1,
        quantity: 2,
        userId: 1,
        productId: 3,
    },
    {
        id: 2,
        quantity: 1,
        userId: 1,
        productId: 2,
    },
    {
        id: 3,
        quantity: 7,
        userId: 1,
        productId: 3,
    },
    {
        id: 4,
        quantity: 2,
        userId: 1,
        productId: 5,
    },
    {
        id: 5,
        quantity: 4,
        userId: 2,
        productId: 35,
    },
];

async function createStuff() {
    for (const category of categories) {
        await prisma.category.create({ data: category });
    }

    for (const product of products) {
        await prisma.product.create({ data: product });
    }

    for (const user of users) {
        await prisma.user.create({ data: user });
    }

    for (const order of orders) {
        await prisma.order.create({ data: order });
    }
}

createStuff();
