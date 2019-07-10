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
                                    min: ks[0]['cutoffScores']
                                }
                            }
                        })
                .object(rawCutOffs)

    return JSON.stringify(Object.values(cutOffs), null, 2)
                        
}

module.exports = nonSECutoffsCSVToJSON