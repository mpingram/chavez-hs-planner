const csvParse = require('csv-parse/lib/sync');
const d3 = require('d3')
const fs = require('fs')

function nonSECutoffsCSVToJSON(csvPath) {
    const csvFile = fs.readFileSync(csvPath, 'utf-8')
    const rawCutOffs  = csvParse(csvFile, {
        columns:true
    })
    cutOffs = d3.nest().key( k => k['school'] ).rollup( ks => {
                            return {
                                programID: ks[0]['school'] + '-' + ks[0]['programType'],
                                school: ks[0]['school'],
                                programType: ks[0]['programType'],
                                cutoffScores: {
                                    min: parseInt(ks[0]['cutoffScores'], 10)
                                }
                            }
                        })
                .object(rawCutOffs)

    return JSON.stringify(Object.values(cutOffs), null, 2)
                        
}

const seJson = nonSECutoffsCSVToJSON('../raw-data/2019-07-10/non-se-cutoff-scores.csv')
fs.writeFileSync('../raw-data/2019-07-10/non-se-cutoff-scores.json', seJson, 'utf-8')

//module.exports = nonSECutoffsCSVToJSON