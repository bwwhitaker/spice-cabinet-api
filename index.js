// index.js

/**
 * Required External Modules
 */

const express = require("express");
const cors = require("cors");
const mysql = require("mysql");
const path = require("path");
const config = require("../spice-cabinet-ui/src/config.json");

const connection = mysql.createConnection({
	user: `${config.user}`,
	password: `${config.password}`,
	database: `${config.database}`,
	host: `${config.host}`,
	port: config.port,
});

/**
 * App Variables
 */

const app = express();
const port = process.env.PORT || "4002";

/**
 *  App Configuration
 */

app.set("views", path.join(__dirname, "views"));
app.use(express.static(path.join(__dirname, "public")));

/**
 * Routes Definitions
 */

const SELECT_ALL_ACCOUNTS_QUERY = "SELECT * FROM spices.recipes";

connection.connect((err) => {
	if (err) {
		return err;
	}
});

app.use(cors());

app.get("/", (req, res) => {
	res.send("Hello.");
});

app.get("/recipes", (req, res) => {
	connection.query(SELECT_ALL_ACCOUNTS_QUERY, (err, results) => {
		if (err) {
			return res.send(err);
		} else {
			return res.json({
				data: results,
			});
		}
	});
});

app.get /
	app.get("/recipes/userdata", (req, res) => {
		const { username } = req.query;
		const user_data_query = `SELECT spice_id from spices.users WHERE username = ('${username}')`;
		connection.query(user_data_query, (err, results) => {
			if (err) {
				return res.send(err);
			} else {
				return res.json({
					data: results,
				});
			}
		});
	});

app.get("/accounts/add", (req, res) => {
	const {
		AccountName,
		AccountType,
		DateAccountOpened,
		AccountLast4,
	} = req.query;
	const INSERT_ACCOUNT_QUERY = `INSERT INTO account_details (AccountName, AccountType, DateOpened, AccountLast4) VALUES('${AccountName}', '${AccountType}', STR_TO_DATE('${DateAccountOpened}', '%m-%d-%Y'), '${AccountLast4}') `;
	connection.query(INSERT_ACCOUNT_QUERY, (err, results) => {
		if (err) {
			return res.send(err);
		} else {
			return res.send("succesfully added account");
		}
	});
});

app.get("/recipes/newuserscabinet", (req, res) => {
	const { Email, SpiceID } = req.query;
	const INSERT_CABINET_QUERY = `INSERT INTO spices.users (username, spice_id) VALUES('${Email}','${SpiceID}') `;
	connection.query(INSERT_CABINET_QUERY, (err, results) => {
		if (err) {
			return res.send(err);
		} else {
			return res.send("succesfully added account");
		}
	});
});

app.get("/recipes/search", (req, res) => {
	const { search } = req.query;
	const getOneQuery = `SELECT * FROM spices.recipes WHERE '${search}' IN (recipe_ingredient_a,recipe_ingredient_b,recipe_ingredient_c,recipe_ingredient_d,recipe_ingredient_e,recipe_ingredient_f,recipe_ingredient_g,recipe_ingredient_h,recipe_ingredient_i,recipe_ingredient_j)`;
	connection.query(getOneQuery, (err, results) => {
		if (err) {
			return res.send(err);
		} else {
			return res.json({
				data: results,
			});
		}
	});
});

/**
 * Server Activation
 */

app.listen(port, () => {
	console.log(`Listening to requests on http://localhost:${port}`);
});
