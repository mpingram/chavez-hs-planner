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
                                                                    min: rs[0]['Min'],
                                                                    mean: rs[0]['Mean'],
                                                                    // some 'Max' entries are blank - in that case, use highest possible score as max cutoff score
                                                                    max: rs[0]['Max'] != '' ? rs[0]['Max'] : MAX_SE_SCORE
                                                                }
                                                            }).object(ks)
                            }
                        }).object(rawCutOffs)

    return JSON.stringify(Object.values(cutOffs), null, 2)
}

module.exports=seCutoffsCSVtoJSON