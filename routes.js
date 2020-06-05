const express = require('express');
const fs = require('fs').promises;

const routes = express.Router();

routes.get('/states', async (req, res) => {
    try {

        let states = await fs.readFile(estados, 'utf-8').then(state => JSON.parse(state));
        let citys = await fs.readFile(cidades, 'utf-8').then(city => JSON.parse(city));

        states.forEach(async (state) => {

            let citysState = citys.filter(city => city.Estado === state.ID);

            await fs.writeFile(`states/${state.Sigla}.json`, JSON.stringify(citysState));

        });

        return res.status(200).send(states);

    } catch (e) {
        return res.status(400).send({ error: e.message });
    }
});

routes.get('/states/:uf', async (req, res) => {
    try {

        let jsonState = await fs.readFile(estados, 'utf-8').then(item => JSON.parse(item));
        let jsonCity = await fs.readFile(cidades, 'utf-8').then(city => JSON.parse(city));

        let state = jsonState.find(item => item.Sigla === req.params.uf);
        let citys = jsonCity.filter(item => item.Estado === state.ID);

        return res.status(200).send({ Estado: state, total_cidades: citys.length });

    } catch (e) {
        return res.status(400).send({ error: e.message });
    }
});

routes.get('/max-states', async (req, res) => {
    try {
        let jsonState = await fs.readFile(estados, 'utf-8').then(state => JSON.parse(state));
        let jsonCity = await fs.readFile(cidades, 'utf-8').then(city => JSON.parse(city));

        let count = [];

        jsonState.forEach(state => {
            let citys = jsonCity.filter(item => item.Estado === state.ID);


            count.push({ uf: state.Sigla, citys: citys.length });
        });

        count.sort((a, b) => {
            return b.citys - a.citys;
        });


        return res.status(200).send(count.slice(0, 5));

    } catch (e) {
        return res.status(400).send({ error: e.message });
    }
});

routes.get('/min-states', async (req, res) => {
    try {
        let jsonState = await fs.readFile(estados, 'utf-8').then(state => JSON.parse(state));
        let jsonCity = await fs.readFile(cidades, 'utf-8').then(city => JSON.parse(city));

        let count = [];

        jsonState.forEach(state => {
            let citys = jsonCity.filter(item => item.Estado === state.ID);

            count.push({ uf: state.Sigla, citys: citys.length });
        });

        count.sort((a, b) => {
            return a.citys - b.citys;
        })

        return res.status(200).send(count.slice(0, 5));


    } catch (e) {
        return res.status(400).send({ error: e.message });
    }
});

routes.get('/citys-max', async (req, res) => {
    try {
        let jsonState = await fs.readFile(estados, 'utf-8').then(state => JSON.parse(state));
        let jsonCity = await fs.readFile(cidades, 'utf-8').then(city => JSON.parse(city));

        let all = [];

        jsonState.forEach(state => {
            let citys = jsonCity.filter(city => city.Estado === state.ID);

            citys.sort((a, b) => {
                if (b.Nome.trim().length - a.Nome.trim().length === 0) {
                    return a.Nome.localeCompare(b.Nome);
                } else {
                    return b.Nome.trim().length - a.Nome.trim().length
                }
            });

            all.push({ uf: state.Sigla, city: citys[0].Nome, length: citys[0].Nome.trim().length });

        });

        all.sort((a, b) => {
            if (b.city.trim().length - a.city.trim().length === 0) {
                return a.uf.localeCompare(b.uf);
            } else {
                return b.city.trim().length - a.city.trim().length;
            }
        })

        return res.status(200).send(all);

    } catch (e) {
        return res.status(400).send({ error: e.message });
    }
});

routes.get('/citys-min', async (req, res) => {
    try {
        let jsonState = await fs.readFile(estados, 'utf-8').then(state => JSON.parse(state));
        let jsonCity = await fs.readFile(cidades, 'utf-8').then(city => JSON.parse(city));

        let all = [];

        jsonState.forEach(state => {
            let citys = jsonCity.filter(city => city.Estado === state.ID);

            citys.sort((a, b) => {
                if (a.Nome.trim().length - b.Nome.trim().length === 0) {
                    return a.Nome.localeCompare(b.Nome);
                } else {
                    return a.Nome.trim().length - b.Nome.trim().length;
                }
            });

            all.push({ uf: state.Sigla, city: citys[0].Nome, length: citys[0].Nome.trim().length });

        });

        all.sort((a, b) => {
            if (a.city.trim().length - b.city.trim().length === 0) {
                return a.uf.localeCompare(b.uf);
            } else {
                return a.city.trim().length - b.city.trim().length;
            }
        })

        return res.status(200).send(all);

    } catch (e) {
        return res.status(400).send({ error: e.message });
    }
});

routes.get('/city-max', async (req, res) => {
    try {
        let jsonState = await fs.readFile(estados, 'utf-8').then(state => JSON.parse(state));
        let jsonCity = await fs.readFile(cidades, 'utf-8').then(city => JSON.parse(city));

        let all = [];

        jsonState.forEach(state => {
            let citys = jsonCity.filter(city => city.Estado === state.ID);

            citys.sort((a, b) => {
                if (b.Nome.trim().length - a.Nome.trim().length === 0) {
                    return a.Nome.localeCompare(b.Nome);
                } else {
                    return b.Nome.trim().length - a.Nome.trim().length
                }
            });

            all.push({ uf: state.Sigla, city: citys[0].Nome, length: citys[0].Nome.trim().length });

        });

        all.sort((a, b) => {
            if (b.city.trim().length - a.city.trim().length === 0) {
                return a.city.localeCompare(b.city);
            } else {
                return b.city.trim().length - a.city.trim().length;
            }
        })

        return res.status(200).send(all[0]);

    } catch (e) {
        return res.status(400).send({ error: e.message });
    }
});

routes.get('/city-min', async (req, res) => {
    try {
        let jsonState = await fs.readFile(estados, 'utf-8').then(state => JSON.parse(state));
        let jsonCity = await fs.readFile(cidades, 'utf-8').then(city => JSON.parse(city));

        let all = [];

        jsonState.forEach(state => {
            let citys = jsonCity.filter(city => city.Estado === state.ID);

            citys.sort((a, b) => {
                if (a.Nome.trim().length - b.Nome.trim().length === 0) {
                    return a.Nome.localeCompare(b.Nome);
                } else {
                    return a.Nome.trim().length - b.Nome.trim().length
                }
            });

            all.push({ uf: state.Sigla, city: citys[0].Nome, length: citys[0].Nome.trim().length });

        });

        all.sort((a, b) => {
            if (a.city.trim().length - b.city.trim().length === 0) {
                return a.city.localeCompare(b.city);
            } else {
                return a.city.trim().length - b.city.trim().length;
            }
        })

        return res.status(200).send(all[0]);

    } catch (e) {
        return res.status(400).send({ error: e.message });
    }
});

module.exports = routes;