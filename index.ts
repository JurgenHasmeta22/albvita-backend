// #region 'Importing and configuration of Prisma'
import express from "express";
import cors from "cors";
import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import "dotenv/config";

const prisma = new PrismaClient({
  log: ["query", "info", "warn", "error"],
});

const app = express();
app.use(cors());
app.use(express.json());

app.use(express.static("public"));

app.get("/", async (req, res) => {
  res.send("Server Up and Running");
});

app.listen(4000, () => {
  console.log(`Server up: http://localhost:4000`);
});
// #endregion

// #region "Token, and getting user loggied in, register, validating if user is logged in"
function createToken(id: number) {
  //@ts-ignore
  const token = jwt.sign({ id: id }, process.env.MY_SECRET, {
    expiresIn: "3days",
  });

  return token;
}

async function getUserFromToken(token: string) {
  //@ts-ignore
  const data = jwt.verify(token, process.env.MY_SECRET);

  const user = await prisma.user.findUnique({
    // @ts-ignore
    where: { id: data.id },
  });

  return user;
}

app.post("/register", async (req, res) => {
  const { email, password, userName } = req.body;

  try {
    const hash = bcrypt.hashSync(password);

    const user = await prisma.user.create({
      data: { email, password: hash, userName },
    });

    res.send({ user, token: createToken(user.id) });
  } catch (err) {
    // @ts-ignore
    res.status(400).send({ error: err.message });
  }
});

app.post("/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await prisma.user.findUnique({
      where: { email },
    });

    // @ts-ignore
    const passwordMatches = bcrypt.compareSync(password, user.password);

    if (user && passwordMatches) {
      res.send({ user, token: createToken(user.id) });
    } else {
      throw Error("Boom");
    }
  } catch (err) {
    // @ts-ignore
    res.status(400).send({ error: err.message });
  }
});

app.get("/validate", async (req, res) => {
  const token = req.headers.authorization || "";

  try {
    const user = await getUserFromToken(token);
    res.send(user);
  } catch (err) {
    // @ts-ignore
    res.status(400).send({ error: err.message });
  }
});
// #endregion

// #region "REST API Endpoints"

// #region "Products REST API Endpoints"
app.get("/getAllProducts/page/:pagenr", async (req, res) => {
  const sortBy = req.query.sortBy;
  const ascOrDesc = req.query.ascOrDesc;
  const categoryName = req.query.category;

  const page = Number(req.params.pagenr);
  const nrToSkip = (page - 1) * 20;

  try {
    let category;
    let products;
    category = await prisma.category.findFirst({
      where: { name: String(categoryName) },
    });
    console.log(category, categoryName, ascOrDesc, sortBy);

    if (categoryName !== "all" && sortBy && ascOrDesc) {
      products = await prisma.product.findMany({
        where: { categoryId: category?.id },
        //@ts-ignore
        include: { category: true },

        orderBy: {
          //@ts-ignore
          [sortBy]: ascOrDesc,
        },

        skip: nrToSkip,
        take: 20,
      });
    } else if (
      categoryName !== "all" &&
      sortBy === undefined &&
      ascOrDesc === undefined
    ) {
      products = await prisma.product.findMany({
        where: { categoryId: category?.id },
        //@ts-ignore
        include: { category: true },

        orderBy: {
          //@ts-ignore
          [sortBy]: ascOrDesc,
        },

        skip: nrToSkip,
        take: 20,
      });
    } else if (categoryName === "all" && sortBy && ascOrDesc) {
      products = await prisma.product.findMany({
        //@ts-ignore
        include: { category: true },

        orderBy: {
          //@ts-ignore
          [sortBy]: ascOrDesc,
        },

        skip: nrToSkip,
        take: 20,
      });
    } else if (
      categoryName === "all" &&
      sortBy === undefined &&
      ascOrDesc === undefined
    ) {
      products = await prisma.product.findMany({
        //@ts-ignore
        include: { category: true },

        skip: nrToSkip,
        take: 20,
      });
    }

    res.send(products);
  } catch (err) {
    // @ts-ignore
    res.status(400).send({ error: err.message });
  }
});

app.get("/getProductByName/:name", async (req, res) => {
  const name = req.params.name
    .split("")
    .map((char) => (char === "-" ? " " : char))
    .join("");

  try {
    const product = await prisma.product.findFirst({
      where: { name },
      //@ts-ignore
      include: { category: true },
    });

    res.send(product);
  } catch (err) {
    // @ts-ignore
    res.status(400).send({ error: err.message });
  }
});

app.get("/getAllProducts", async (req, res) => {
  try {
    const products = await prisma.product.findMany({
      // @ts-ignore
      include: { category: true },
    });
    res.send(products);
  } catch (err) {
    // @ts-ignore
    res.status(400).send({ error: err.message });
  }
});

app.get("/getAllProductsCount", async (req, res) => {
  try {
    const count = await prisma.product.count();
    res.send({ count });
  } catch (err) {
    // @ts-ignore
    res.status(400).send({ error: err.message });
  }
});

app.post("/searchProductNameByCategory", async (req, res) => {
  const { name, page } = req.body;

  try {
    const products = await prisma.product.findMany({
      where: {
        name: { contains: name },
      },
      // @ts-ignore
      include: { category: true },
      skip: (page - 1) * 20,
      take: 20,
    });

    const count = await prisma.product.count({
      where: {
        name: { contains: name },
      },
    });

    res.send({ products, count });
  } catch (err) {
    // @ts-ignore
    res.status(400).send({ error: err.message });
  }
});
// #endregion

// #endregion

// #region "OTHER REST API Endpoints"

app.get("/getAllUsers", async (req, res) => {
  try {
    const users = await prisma.user.findMany();
    res.send(users);
  } catch (err) {
    // @ts-ignore
    res.status(400).send({ error: err.message });
  }
});

app.get("/getUserById/:id", async (req, res) => {
  const idParam = Number(req.params.id);
  try {
    const user = await prisma.user.findFirst({
      where: { id: idParam },
      include: {
        boughtItems: { include: { product: { include: { category: true } } } },
      },
    });
    res.send(user);
  } catch (err) {
    // @ts-ignore
    res.status(400).send({ error: err.message });
  }
});

app.get("/getAllCategories", async (req, res) => {
  try {
    const categories = await prisma.category.findMany({
      // @ts-ignore
      include: { products: true },
    });
    res.send(categories);
  } catch (err) {
    // @ts-ignore
    res.status(400).send({ error: err.message });
  }
});

app.get("/getAllBoughtProducts", async (req, res) => {
  try {
    const bought = await prisma.bought.findMany({
      // @ts-ignore
      include: { product: true, user: true },
    });
    res.send(bought);
  } catch (err) {
    // @ts-ignore
    res.status(400).send({ error: err.message });
  }
});

app.get("/getBoughtItemById/:id", async (req, res) => {
  const id = Number(req.params.id);

  try {
    const bought = await prisma.bought.findFirst({
      where: { id },
      //@ts-ignore
      include: { product: true, user: true },
    });

    res.send(bought);
  } catch (err) {
    // @ts-ignore
    res.status(400).send({ error: err.message });
  }
});

app.get("/getCategoryByName/:name", async (req, res) => {
  const name = req.params.name
    .split("")
    .map((char) => (char === "-" ? " " : char))
    .join("");

  try {
    const category = await prisma.category.findFirst({
      where: { name },
      //@ts-ignore
      include: { products: true },
    });

    res.send(category);
  } catch (err) {
    // @ts-ignore
    res.status(400).send({ error: err.message });
  }
});

app.patch("/updateBought/:id", async (req, res) => {
  const id = Number(req.params.id);
  const { userId, productId, quantity } = req.body;

  const updatedBought = {
    id,
    userId,
    productId,
    quantity,
  };

  try {
    const findBought = await prisma.bought.findFirst({ where: { id } });

    if (findBought) {
      const finalBought = await prisma.bought.update({
        where: { id },
        data: updatedBought,
        include: { product: true, user: true },
      });
      const userUpdated = await prisma.user.findFirst({
        where: { id: userId },
        include: { boughtItems: { include: { product: true } } },
      });

      res.status(200).send({
        finalBought,
        userUpdated,
      });
    } else {
      res.status(400).send({ error: "error" });
    }
  } catch (err) {
    //@ts-ignore
    res.status(400).send({ error: err.message });
  }
});

app.post("/searchCategoriesByName", async (req, res) => {
  const { name, page } = req.body;

  try {
    const categories = await prisma.category.findMany({
      where: {
        name: { contains: name },
      },
      // @ts-ignore
      include: { category: true },
      skip: (page - 1) * 20,
      take: 20,
    });

    const count = await prisma.category.count({
      where: {
        name: { contains: name },
      },
    });

    res.send({ categories, count });
  } catch (err) {
    // @ts-ignore
    res.status(400).send({ error: err.message });
  }
});

// #endregion

module.exports = app;
