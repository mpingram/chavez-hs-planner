const csvParse = require('csv-parse/lib/sync');
const d3 = require('d3')
const fs = require('fs')

const MAX_SE_SCORE = '900'
const SE_PROGRAM_TYPE = 'Selective Enrollment'

function seCutoffsCSVtoJSON(path){
    const csvFile = fs.readFileSync(path, 'utf-8')
    const rawCutOffs  = csvParse(csvFile, {
        columns:true
    })
    cutOffs = d3.nest().key(k => k.School)
                        .rollup(ks => {
                            return {
                                school: ks[0].School,
                                programID: ks[0].School + '-'+SE_PROGRAM_TYPE,
                                programType: SE_PROGRAM_TYPE,
                                tieredCutoffScores: d3.nest().key(k => k['Selection Method'])
                                                            .rollup(rs => {
                                                                return {
                                                                    min: parseInt(rs[0]['Min'], 10),
                                                                    mean: parseInt(rs[0]['Mean'],10),
                                                                    // some 'Max' entries are blank - in that case, use highest possible score as max cutoff score
                                                                    max: parseInt(rs[0]['Max'] != '' ? rs[0]['Max'] : MAX_SE_SCORE,10)
                                                                }
                                                            }).object(ks)
                            }
                        }).object(rawCutOffs)

    return JSON.stringify(Object.values(cutOffs), null, 2)

}

//const seJson = seCutoffsCSVtoJSON('../raw-data/2019-07-10/se-cutoff-scores.csv')
//fs.writeFileSync('../raw-data/2019-07-10/se-cutoff-scores.json', seJson, 'utf-8')

module.exports=seCutoffsCSVtoJSON