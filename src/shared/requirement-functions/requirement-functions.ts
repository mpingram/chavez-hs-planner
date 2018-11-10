import {
  RequirementFunction,
} from "shared/types";

import {
  SuccessChance,
} from "shared/enums";


import {
  accept, 
  lottery,
  SIBLING_LOTTERY_STAGE,
  PROXIMITY_LOTTERY_STAGE,
  TIER_LOTTERY_STAGE,
  GENERAL_LOTTERY_STAGE,
  LotteryStageSize,
  conditional,
  createIBPointSystem,
  createSEPointSystem,
  notImplemented
} from "./requirement-function-builders";

import {
  either,
  both,
  everyone,
  ifSiblingAttends, 
  ifStudentAttendsOneOf, 
  ifHasGrades,
  createIfInAttendBound,
  ifIEPorEL,
  ifSkipped7OrRepeated8
} from "./requirement-function-builders/filters";

import {
  AUSL_ES_PROGRAMS,
  GROW_COMMUNITY_SCHOOL_ES_PROGRAMS,
  ACERO_ES_PROGRAMS,

  FOUNDATIONS_COLLEGE_PREP_JOINT_ES_HS_PROGRAM,
  CHICAGO_VIRTUAL_GENERAL_EDUCATION_JOINT_ES_HS_PROGRAM,
  CICS_LONGWOOD_GENERAL_EDUCATION_JOINT_ES_HS_PROGRAM,
  CICS_CHICAGOQUEST_GENERAL_EDUCATION_JOINT_ES_HS_PROGRAM,
  CHICAGO_MATH_AND_SCIENCE_GENERAL_EDUCATION_JOINT_ES_HS_PROGRAM,
  U_OF_C_WOODLAWN_GENERAL_EDUCATION_JOINT_ES_HS_PROGRAM,
  CHICAGO_COLLEGIATE_GENERAL_EDUCATION_JOINT_ES_HS_PROGRAM,
  JAMIESON_OPEN_ENROLLMENT_ES_PROGRAM,
  JAMIESON_GENERAL_EDUCATION_ES_PROGRAM,
  CLINTON_ES_PROGRAM,
  PETERSON_ES_PROGRAM,
  ROGERS_ES_PROGRAM,
  OGDEN_ES_PROGRAM,
  DISNEY_II_ES_PROGRAM,

  ASPIRA_MS_PROGRAM,
  CICS_AVALON_ES_PROGRAM,
  CICS_BASIL_ES_PROGRAM,
  CICS_BUCKTOWN_ES_PROGRAM,
  //CICS_LOOMIS_ES_PROGRAM, //?
  CICS_IRVING_PARK_ES_PROGRAM,
  CICS_PRAIRIE_ES_PROGRAM,
  CICS_WASHINGTON_PARK_ES_PROGRAM,
  CICS_WEST_BELDEN_ES_PROGRAM,
  CICS_WRIGHTWOOD_ES_PROGRAM,
  
  BRENNEMANN_ES_PROGRAM,
  COURTENAY_ES_PROGRAM,
  MCCUTCHEON_ES_PROGRAM,
  CHALMERS_ES_PROGRAM,
  DVORAK_ES_PROGRAM,
  HERZL_ES_PROGRAM,
  JOHNSON_ES_PROGRAM,
  MORTON_ES_PROGRAM,
  TAFT_ACADEMIC_CENTER_PROGRAM,
  MORGAN_PARK_ACADEMIC_CENTER_PROGRAM,
  KENWOOD_ACADEMIC_CENTER_PROGRAM,
  CARNEGIE_ES_PROGRAMS,
  ALCOTT_ES_PROGRAM,
  BOONE_ES_PROGRAM,
  FIELD_ES_PROGRAM,
  GALE_ES_PROGRAM,
  HAYT_ES_PROGRAM,
  JORDAN_ES_PROGRAM,
  KILMER_ES_PROGRAM,
  MCPHERSON_ES_PROGRAM,
  WEST_RIDGE_ES_PROGRAM,


} from "./constants";

/* 
 * Initialize ibPointSystem, sePointSystem, and getAttendBoundDict.
 *
 * These three functions depend on app data (school cutoff scores and attendance boundary geo data). 
 * We need to initialize these functions by passing them a link
 * to the app's redux store, which holds the data.
 * */
import { store } from "shared/redux/store";
const getAttendBoundDict = () => store.getState().data.schoolAttendanceBoundaryTable;
const getSECutoffScores = () => store.getState().data.seCutoffScores;
const getNonSECutoffScores = () => store.getState().data.nonSECutoffScores;

const ifInAttendBound = createIfInAttendBound(getAttendBoundDict);
const ibPointSystem: RequirementFunction = createIBPointSystem(getNonSECutoffScores, ifInAttendBound);
const sePointSystem: RequirementFunction = createSEPointSystem(getSECutoffScores);

interface ReqFnTable {
  [reqFnId: string]: {
    id?: string
    name?: string
    desc: string
    programs: string[]
    fn: RequirementFunction
  }
}
const requirementFunctions: ReqFnTable = {
    "6adf97f83acf6453d4a6a4b1070f3754": {
        "desc": "None",
        "programs": [
            "NOBLE - JOHNSON HS - General Education - Application",
            "FOUNDATIONS - General Education - Application",
            "NOBLE - PRITZKER HS - General Education - Application",
            "PERSPECTIVES - TECH HS - General Education - Application",
            "FARRAGUT HS - General Education - Application",
            "URBAN PREP - WEST HS - General Education - Application",
            "AUSTIN CCA HS - General Education - Application",
            "CHICAGO VIRTUAL - Charter - Application",
            "NOBLE - MANSUETO HS - General Education - Application",
            "ACERO - SOTO HS - General Education - Application",
            "CICS - LONGWOOD - Charter - Application",
            "NOBLE - NOBLE HS - General Education - Application",
            "ACERO - GARCIA HS - General Education - Application",
            "ASPIRA - EARLY COLLEGE HS - General Education - Application",
            "NOBLE - UIC HS - General Education - Application",
            "WELLS HS - Pre-Law - Application",
            "NOBLE - COMER - General Education - Application",
            "SCHURZ HS - Accounting & Entrepreneurship - Application",
            "WASHINGTON HS - General Education - Application",
            "SCHURZ HS - General Education - Application",
            "JUAREZ HS - General Education - Application",
            "CHICAGO VOCATIONAL HS - Agricultural Sciences - Application",
            "RICHARDS HS - General Education - Application",
            "BOGAN HS - Entrepreneurship - Application",
            "DOUGLASS HS - General Education - Application",
            "LAKE VIEW HS - General Education - Application",
            "ROOSEVELT HS - Game Programming - Application",
            "ROOSEVELT HS - Medical & Health Careers - Application",
            "NORTH-GRAND HS - Culinary Arts - Application",
            "FOREMAN HS - Digital Media - Application",
            "PHILLIPS HS - Digital Media - Application",
            "ALCOTT HS - Pre-Engineering - Application",
            "CURIE HS - Game Programming & Web Design - Application",
            "CHICAGO MATH & SCIENCE HS - General Education - Application",
            "BOWEN HS - Manufacturing - Application",
            "JUAREZ HS - Culinary Arts - Application",
            "SULLIVAN HS - Medical & Health Careers - Application",
            "HUBBARD HS - General Education - Application",
            "CHICAGO VOCATIONAL HS - Culinary Arts - Application",
            "CICS - NORTHTOWN HS - General Education - Application",
            "JULIAN HS - General Education - Application",
            "SCHURZ HS - Automotive Technology - Application",
            "CICS - CHICAGOQUEST HS - General Education - Application",
            "COLLINS HS - Game Programming - Application",
            "SULLIVAN HS - Accounting - Application",
            "CHICAGO VIRTUAL - General Education - Application",
            "SPRY HS - General Education - Application",
            "FARRAGUT HS - Pre-Law - Application",
            "NOBLE - BAKER HS - General Education - Application",
            "CLEMENTE HS - Broadcast Technology - Application",
            "SOUTH SHORE INTL HS - Medical & Health Careers - Application",
            "CURIE HS - Accounting - Application",
            "ROOSEVELT HS - Early Childhood - Application",
            "PERSPECTIVES - MATH & SCI HS - General Education - Application",
            "KENNEDY HS - General Education - Application",
            "KELLY HS - General Education - Application",
            "FARRAGUT HS - Automotive Technology - Application",
            "JULIAN HS - Entrepreneurship - Application",
            "CHICAGO VOCATIONAL HS - Carpentry - Application",
            "CICS - ELLISON HS - General Education - Application",
            "NOBLE - BULLS HS - General Education - Application",
            "JULIAN HS - Allied Health - Application",
            "ROOSEVELT HS - General Education - Application",
            "URBAN PREP - ENGLEWOOD HS - General Education - Application",
            "HYDE PARK HS - Broadcast Technology - Application",
            "NORTH-GRAND HS - General Education - Application",
            "GAGE PARK HS - General Education - Application",
            "UPLIFT HS - General Education - Application",
            "JUAREZ HS - Automotive Technology - Application",
            "U OF C - WOODLAWN HS - General Education - Application",
            "TILDEN HS - General Education - Application",
            "BOWEN HS - General Education - Application",
            "DUNBAR HS - Chicago Builds - Application",
            "TAFT HS - General Education - Application",
            "MORGAN PARK HS - General Education - Application",
            "JULIAN HS - Broadcast Technology - Application",
            "CURIE HS - Early Childhood & Teaching - Application",
            "CLEMENTE HS - Culinary Arts - Application",
            "BOGAN HS - Accounting - Application",
            "NORTH-GRAND HS - Pre-Engineering - Application",
            "CURIE HS - Automotive Technology - Application",
            "JUAREZ HS - Medical & Health Careers - Application",
            "JULIAN HS - Game Programming - Application",
            "NORTH-GRAND HS - Allied Health - Application",
            "JUAREZ HS - Architecture - Application",
            "TILDEN HS - Culinary Arts - Application",
            "INTRINSIC HS - General Education - Application",
            "NOBLE - RAUNER HS - General Education - Application",
            "SCHURZ HS - Digital Media - Application",
            "FOREMAN HS - Web Design - Application",
            "PERSPECTIVES - LEADERSHIP HS - General Education - Application",
            "HYDE PARK HS - Digital Media - Application",
            "CICS - LONGWOOD - General Education - Application",
            "CORLISS HS - Early College STEM - Application",
            "BOWEN HS - Pre-Engineering - Application",
            "HYDE PARK HS - General Education - Application",
            "ROOSEVELT HS - Culinary Arts - Application",
            "FOREMAN HS - General Education - Application",
            "NOBLE - ROWE CLARK HS - General Education - Application",
            "CURIE HS - Broadcast Technology - Application",
            "NOBLE - MUCHIN HS - General Education - Application",
            "ALCOTT HS - General Education - Application",
            "RICHARDS HS - Culinary Arts - Application",
            "FENGER HS - Culinary Arts - Application",
            "SCHURZ HS - Allied Health - Application",
            "RABY HS - Culinary Arts - Application",
            "RABY HS - Pre-Law - Application",
            "FENGER HS - General Education - Application",
            "HARPER HS - Culinary Arts - Application",
            "NOBLE - DRW HS - General Education - Application",
            "AMUNDSEN HS - General Education - Application",
            "WILLIAMS HS - Medical & Health Careers - Application",
            "NOBLE - GOLDER HS - General Education - Application",
            "RABY HS - Broadcast Technology - Application",
            "HIRSCH HS - General Education - Application",
            "STEINMETZ HS - Digital Media - Application",
            "JULIAN HS - Digital Media - Application",
            "AUSTIN CCA HS - Manufacturing - Application",
            "HARPER HS - Digital Media - Application",
            "DYETT ARTS HS - General Education - Application",
            "MATHER HS - Pre-Law - Application",
            "AMUNDSEN HS - Game Programming & Web Design - Application",
            "SOLORIO HS - General Education - Application",
            "PERSPECTIVES - JOSLIN HS - General Education - Application",
            "RICHARDS HS - Accounting - Application",
            "MATHER HS - Game Programming & Web Design - Application",
            "EPIC HS - General Education - Application",
            "BOGAN HS - General Education - Application",
            "CHICAGO COLLEGIATE - General Education - Application",
            "CURIE HS - Culinary Arts - Application",
            "RABY HS - Entrepreneurship - Application",
            "CLEMENTE HS - Allied Health - Application",
            "DYETT ARTS HS - Digital Media - Application",
            "DUNBAR HS - Allied Health - Application",
            "CHICAGO VOCATIONAL HS - Early College STEM - Application",
            "HARLAN HS - Digital Media - Application",
            "DUNBAR HS - Career Academy - Application",
            "MANLEY HS - Culinary Arts - Application",
            "CHICAGO VOCATIONAL HS - Diesel Technology - Application",
            "CURIE HS - Fine Arts & Technology - NEIGHBORHOOD - Application",
            "CHICAGO VOCATIONAL HS - General Education - Application",
            "STEINMETZ HS - General Education - Application",
            "SENN HS - General Education - Application",
            "WELLS HS - Game Programming - Application",
            "NOBLE - HANSBERRY HS - General Education - Application",
            "ROBESON HS - General Education - Application",
            "CHICAGO VOCATIONAL HS - Medical Assisting - Application",
            "LAKE VIEW HS - Early College STEM - Application",
            "CHICAGO VOCATIONAL HS - Cosmetology - Application",
            "FENGER HS - Carpentry - Application",
            "HARLAN HS - Web Design - Application",
            "CURIE HS - Digital Media - Application",
            "URBAN PREP - BRONZEVILLE HS - General Education - Application",
            "CURIE HS - Architecture - Application",
            "KENWOOD HS - General Education - Application",
            "MATHER HS - General Education - Application",
            "AUSTIN CCA HS - Pre-Engineering - Application",
            "ORR HS - General Education - Application",
            "SULLIVAN HS - General Education - Application",
            "MANLEY HS - General Education - Application",
            "HOPE HS - General Education - Application",
            "NORTH LAWNDALE - CHRISTIANA HS - General Education - Application",
            "NORTH LAWNDALE - COLLINS HS - General Education - Application",
            "UPLIFT HS - Teaching - Application",
            "SCHURZ HS - Pre-Engineering - Application",
            "ACE TECH HS - General Education - Application",
            "LEGAL PREP HS - General Education - Application",
            "ASPIRA - BUSINESS & FINANCE HS - General Education - Application",
            "JUAREZ HS - Game Programming & Web Design - Application",
            "PROSSER HS - Career Academy - Application",
            "HARPER HS - General Education - Application",
            "INSTITUTO - HEALTH - General Education - Application",
            "ROOSEVELT HS - Cisco Networking - Application",
            "INFINITY HS - Science/Technology/Engineering/Math - Application",
            "CHICAGO TECH HS - Science/Technology/Engineering/Math - Application",
            "NOBLE - ITW SPEER HS - General Education - Application",
            "NOBLE - BUTLER HS - General Education - Application",
            "NOBLE - ACADEMY HS - General Education - Application",
            "MARSHALL HS - General Education - Application",
            "MARSHALL HS - Agricultural Sciences - Application",
            "MARSHALL HS - Culinary Arts - Application"
        ],
      "fn": accept(everyone)
    },
    "f1a0a3737e921ccaf4617c5eafab5f53": {
        "desc": "Students are randomly selected by computerized lottery. Contact the school for additional information.",
        "programs": [
            "NOBLE - JOHNSON HS - General Education - Selection",
            "NOBLE - PRITZKER HS - General Education - Selection",
            "PERSPECTIVES - TECH HS - General Education - Selection",
            "URBAN PREP - WEST HS - General Education - Selection",
            "NOBLE - MANSUETO HS - General Education - Selection",
            "ACERO - SOTO HS - General Education - Selection",
            "NOBLE - NOBLE HS - General Education - Selection",
            "ACERO - GARCIA HS - General Education - Selection",
            "ASPIRA - EARLY COLLEGE HS - General Education - Selection",
            "NOBLE - UIC HS - General Education - Selection",
            "NOBLE - COMER - General Education - Selection",
            "CICS - NORTHTOWN HS - General Education - Selection",
            "NOBLE - BAKER HS - General Education - Selection",
            "PERSPECTIVES - MATH & SCI HS - General Education - Selection",
            "CICS - ELLISON HS - General Education - Selection",
            "NOBLE - BULLS HS - General Education - Selection",
            "URBAN PREP - ENGLEWOOD HS - General Education - Selection",
            "NOBLE - RAUNER HS - General Education - Selection",
            "PERSPECTIVES - LEADERSHIP HS - General Education - Selection",
            "CICS - LONGWOOD - General Education - Selection",
            "NOBLE - ROWE CLARK HS - General Education - Selection",
            "NOBLE - MUCHIN HS - General Education - Selection",
            "NOBLE - DRW HS - General Education - Selection",
            "NOBLE - GOLDER HS - General Education - Selection",
            "PERSPECTIVES - JOSLIN HS - General Education - Selection",
            "EPIC HS - General Education - Selection",
            "NOBLE - HANSBERRY HS - General Education - Selection",
            "URBAN PREP - BRONZEVILLE HS - General Education - Selection",
            "ASPIRA - BUSINESS & FINANCE HS - General Education - Selection",
            "NOBLE - ITW SPEER HS - General Education - Selection",
            "NOBLE - BUTLER HS - General Education - Selection",
            "NOBLE - ACADEMY HS - General Education - Selection"
        ],
      "fn": lottery(GENERAL_LOTTERY_STAGE)
    },
    "ea7a8ea4de4f5cdcc8bc6e7aab6a7962": {
        "desc": "Students are randomly selected by computerized lottery. The lottery is conducted in the following order: students currently enrolled at Foundations College Prep, isibling, general.",
        "programs": [
            "FOUNDATIONS - General Education - Selection"
        ],
      "fn": lottery(
        {
          filter: ifStudentAttendsOneOf(FOUNDATIONS_COLLEGE_PREP_JOINT_ES_HS_PROGRAM),
          size: LotteryStageSize.LARGE
        },
        SIBLING_LOTTERY_STAGE,
        GENERAL_LOTTERY_STAGE
      )
    },
    "783216956d119ad64639725fa9f4d44b": {
        "desc": "Students who live within the school's attendance boundary can be admitted automatically. This program only accepts students who live within the school's attendance boundary.",
        "programs": [
            "FARRAGUT HS - General Education - Selection",
            "WASHINGTON HS - General Education - Selection",
            "HUBBARD HS - General Education - Selection",
            "KENNEDY HS - General Education - Selection",
            "KELLY HS - General Education - Selection",
            "ROOSEVELT HS - General Education - Selection",
            "BOGAN HS - General Education - Selection",
            "CURIE HS - Fine Arts & Technology - NEIGHBORHOOD - Selection",
            "SENN HS - General Education - Selection"
        ],
      "fn": accept(ifInAttendBound)
    },
    "240970c398eb1cf1d65952b71e811d58": {
        "desc": "If the school receives more applications than there are seats available, students are randomly selected through a computerized lottery.  Priority is given to students currently enrolled in the school and to siblings of students enrolled in the campus.",
        "programs": [
            "CHICAGO VIRTUAL - Charter - Selection"
        ],
      "fn": lottery(
        {
          filter: either(
            ifSiblingAttends, 
            ifStudentAttendsOneOf(
              CHICAGO_VIRTUAL_GENERAL_EDUCATION_JOINT_ES_HS_PROGRAM
            )
          ),
          size: LotteryStageSize.LARGE
        },
        GENERAL_LOTTERY_STAGE
      )
    },
    "01a561f658ea66df980a6e77eae83235": {
        "desc": "If the school receives more applications than there are seats available, students are randomly selected through a computerized lottery.  Priority is given to students currently enrolled in the school who wish to continue and to siblings of students enrolled in the campus.",
        "programs": [
            "CICS - LONGWOOD - Charter - Selection"
        ],
        "fn": lottery(
          {
            filter: either(
              ifSiblingAttends, 
              ifStudentAttendsOneOf(
                CICS_LONGWOOD_GENERAL_EDUCATION_JOINT_ES_HS_PROGRAM
              )),
            size: LotteryStageSize.LARGE
          },
          GENERAL_LOTTERY_STAGE
        )
    },
    "8c431d51587c33009ee9b67a566c042e": {
        "desc": "Students who live within the school's attendance boundary can be admitted automatically.  Students who live outside of the school's attendance boundary are randomly selected by computerized lottery. The lottery is conducted in the following order: sibling, general.",
        "programs": [
            "AUSTIN CCA HS - General Education - Selection",
            "JULIAN HS - General Education - Selection",
            "NORTH-GRAND HS - General Education - Selection",
            "GAGE PARK HS - General Education - Selection",
            "BOWEN HS - General Education - Selection",
            "FOREMAN HS - General Education - Selection",
            "FENGER HS - General Education - Selection",
            "HIRSCH HS - General Education - Selection",
            "CHICAGO VOCATIONAL HS - General Education - Selection",
            "ROBESON HS - General Education - Selection",
            "ORR HS - General Education - Selection",
            "MANLEY HS - General Education - Selection",
            "HOPE HS - General Education - Selection",
            "HARPER HS - General Education - Selection",
            "INFINITY HS - Science/Technology/Engineering/Math - Selection",
            "MARSHALL HS - General Education - Selection"
        ],
      "fn": conditional(
        {
          filter: ifInAttendBound,
          fn: accept(everyone)
        },
        {
          filter: everyone,
          fn: lottery(
            SIBLING_LOTTERY_STAGE,
            GENERAL_LOTTERY_STAGE
          )
        }
      )
    },
    "6fddb8b397a12770dbed5afff360213b": {
        "desc": "Minimum percentile of 75 in both reading and math on NWEA MAP, minimum 3.0 GPA in 7th grade, and minimum attendance percentage of 95.",
        "programs": [
            "SOLORIO HS - Double Honors/Scholars - Application"
        ],
      "fn": accept(ifHasGrades({
        nweaBoth: 75,
        gpa: 3.0,
        attendance: 95
      }))
    },
    "218f3d334a0ceaa37bb7ce57bec10e96": {
        "desc": "Students are randomly selected by computerized lottery. The lottery is conducted in the following order: sibling, proximity, students enrolled in AUSL schools, general.",
        "programs": [
            "SOLORIO HS - Double Honors/Scholars - Selection",
            "CHICAGO ACADEMY HS - Scholars - Selection",
            "CHICAGO ACADEMY HS - General Education - Selection"
        ],
      "fn": lottery(
        SIBLING_LOTTERY_STAGE,
        PROXIMITY_LOTTERY_STAGE,
        {
          filter: ifStudentAttendsOneOf(...AUSL_ES_PROGRAMS),
          size: LotteryStageSize.LARGE
        },
        GENERAL_LOTTERY_STAGE
      )
    },
    "3086b8e507b2f64e53b85b8ad808e66d": {
        "desc": "Minimum 2.0 GPA in 7th grade and minimum attendance percentage of 85.",
        "programs": [
            "FARRAGUT HS - JROTC - Application",
            "SCHURZ HS - AVID - Application"
        ],
      "fn": accept(ifHasGrades({
        gpa: 2.0,
        attendance: 85
      }))
    },
    "d3ddea21fb0e360b470bf095ce6bdfef": {
        "desc": "Students are randomly selected by computerized lottery. The lottery is conducted in the following order: proximity, general.",
        "programs": [
            "FARRAGUT HS - JROTC - Selection",
            "ROBESON HS - Allied Health - Selection",
            "DUNBAR HS - Chicago Builds - Selection",
            "SCHURZ HS - AVID - Selection",
            "PROSSER HS - Career Academy - Selection"
        ],
        "fn": lottery(
          PROXIMITY_LOTTERY_STAGE,
          GENERAL_LOTTERY_STAGE
        )
    },
    "618315c228cf8e591d1909fc8ca41206": {
        "desc": "Students are selected on a point system. Points are based on 7th grade final GPA and NWEA MAP scores. The school determines the minimum cutoff score for selections.",
        "programs": [
            "WELLS HS - Pre-Law - Selection",
            "ALCOTT HS - Pre-Engineering - Selection",
            "SULLIVAN HS - Medical & Health Careers - Selection",
            "FARRAGUT HS - Pre-Law - Selection",
            "SOUTH SHORE INTL HS - Medical & Health Careers - Selection",
            "JULIAN HS - Allied Health - Selection",
            "JUAREZ HS - Medical & Health Careers - Selection",
            "BOWEN HS - Pre-Engineering - Selection",
            "WILLIAMS HS - Medical & Health Careers - Selection",
            "CLEMENTE HS - Allied Health - Selection",
            "DUNBAR HS - Allied Health - Selection",
            "CHICAGO VOCATIONAL HS - Medical Assisting - Selection",
            "SCHURZ HS - Pre-Engineering - Selection"
        ],
      "fn": notImplemented
    },
    "f661cdb969617a4f2a3923f5c80c190c": {
        "desc": "General Education and 504 Plan students: Minimum percentile of 50 in both reading and math on NWEA MAP, minimum 2.7 GPA in 7th grade, and minimum attendance percentage of 90.  IEP and EL students: Minimum combined percentile of 50 in reading and math on NWEA MAP.  An Interview is required for all eligible applicants.",
        "programs": [
            "DYETT ARTS HS - Music - Application",
            "DYETT ARTS HS - Visual Arts - Application",
            "DYETT ARTS HS - Dance - Application"
        ],
      "fn": conditional(
        {
          filter: ifIEPorEL,
          fn: accept(ifHasGrades({
            nweaCombined: 50
          }))
        },
        {
          filter: everyone,
          fn: accept(ifHasGrades({
            nweaBoth: 50,
            gpa: 2.7,
            attendance: 90
          }))
        }

      )
    },
    "3d86881707e468c9fe2a0ce0f5eeac4f": {
        "name": "",
        "desc": "Students are selected on a point system. Points are based on the student's NWEA MAP scores in reading and math and the interview.",
        "programs": [
            "DYETT ARTS HS - Music - Selection",
            "DYETT ARTS HS - Visual Arts - Selection",
            "DYETT ARTS HS - Dance - Selection"
        ],
        "fn": notImplemented
    },
    "7672890f5b16cd8f5c0cae20d58d1888": {
        "name": "",
        "desc": "Students are randomly selected by computerized lottery. General Education and 504 Plan students: Preference is given to students with percentiles of 24 and above on the NWEA MAP in reading and math. A total of 30% of the seats will be made available to attendance area applicants.  IEP and EL students: Preference is given to students with combined NWEA MAP scores that equal 48 or above.  Note: Repeating 8th graders and students pushed into 8th grade from 6th grade due to age requirements qualify for selection but will be placed in a lower preference group.",
        "programs": [
            "SCHURZ HS - Accounting & Entrepreneurship - Selection",
            "KELLY HS - Digital Media - Selection",
            "CHICAGO VOCATIONAL HS - Agricultural Sciences - Selection",
            "BOGAN HS - Entrepreneurship - Selection",
            "ROOSEVELT HS - Game Programming - Selection",
            "NORTH-GRAND HS - Culinary Arts - Selection",
            "FOREMAN HS - Digital Media - Selection",
            "PHILLIPS HS - Digital Media - Selection",
            "CURIE HS - Game Programming & Web Design - Selection",
            "BOWEN HS - Manufacturing - Selection",
            "JUAREZ HS - Culinary Arts - Selection",
            "CHICAGO VOCATIONAL HS - Culinary Arts - Selection",
            "SCHURZ HS - Automotive Technology - Selection",
            "COLLINS HS - Game Programming - Selection",
            "CLEMENTE HS - Broadcast Technology - Selection",
            "CURIE HS - Accounting - Selection",
            "ROOSEVELT HS - Early Childhood - Selection",
            "FARRAGUT HS - Automotive Technology - Selection",
            "JULIAN HS - Entrepreneurship - Selection",
            "CHICAGO VOCATIONAL HS - Carpentry - Selection",
            "HYDE PARK HS - Broadcast Technology - Selection",
            "JUAREZ HS - Automotive Technology - Selection",
            "JULIAN HS - Broadcast Technology - Selection",
            "CURIE HS - Early Childhood & Teaching - Selection",
            "CLEMENTE HS - Culinary Arts - Selection",
            "CURIE HS - Automotive Technology - Selection",
            "JULIAN HS - Game Programming - Selection",
            "JUAREZ HS - Architecture - Selection",
            "TILDEN HS - Culinary Arts - Selection",
            "SCHURZ HS - Digital Media - Selection",
            "FOREMAN HS - Web Design - Selection",
            "HYDE PARK HS - Digital Media - Selection",
            "ROOSEVELT HS - Culinary Arts - Selection",
            "CURIE HS - Broadcast Technology - Selection",
            "RICHARDS HS - Culinary Arts - Selection",
            "FENGER HS - Culinary Arts - Selection",
            "RABY HS - Culinary Arts - Selection",
            "HARPER HS - Culinary Arts - Selection",
            "RABY HS - Broadcast Technology - Selection",
            "STEINMETZ HS - Digital Media - Selection",
            "JULIAN HS - Digital Media - Selection",
            "AUSTIN CCA HS - Manufacturing - Selection",
            "HARPER HS - Digital Media - Selection",
            "AMUNDSEN HS - Game Programming & Web Design - Selection",
            "RICHARDS HS - Accounting - Selection",
            "MATHER HS - Game Programming & Web Design - Selection",
            "CURIE HS - Culinary Arts - Selection",
            "RABY HS - Entrepreneurship - Selection",
            "CHICAGO VOCATIONAL HS - Early College STEM - Selection",
            "HARLAN HS - Digital Media - Selection",
            "MANLEY HS - Culinary Arts - Selection",
            "CHICAGO VOCATIONAL HS - Diesel Technology - Selection",
            "WELLS HS - Game Programming - Selection",
            "FENGER HS - Carpentry - Selection",
            "HARLAN HS - Web Design - Selection",
            "CURIE HS - Digital Media - Selection",
            "CURIE HS - Architecture - Selection",
            "UPLIFT HS - Teaching - Selection",
            "JUAREZ HS - Game Programming & Web Design - Selection",
            "MARSHALL HS - Agricultural Sciences - Selection",
            "MARSHALL HS - Culinary Arts - Selection",
            "SULLIVAN HS - Accounting - Selection",
            "BOGAN HS - Accounting - Selection",
        ],
      // custom req fn -- req fn builders a little ungainly for handling
      // this kind of branching.
      "fn": (s, p) => {
        if( ifSkipped7OrRepeated8(s,p) ) {
          return SuccessChance.UNLIKELY
        } else if ( ifIEPorEL(s,p) ) {
          const passesGrades = ifHasGrades({nweaCombined: 48})(s, p);
          if( passesGrades ) { 
            return SuccessChance.LIKELY;
          } else {
            return SuccessChance.UNCERTAIN;
          }

        } else {
          const passesGrades = ifHasGrades({nweaBoth: 24})(s, p);
          if ( passesGrades ) {
            return SuccessChance.LIKELY;
          } else {
            return SuccessChance.UNCERTAIN;
          }
        }
      }
    },
    "4773ff8378c681fdc3855cec189b446d": {
        "name": "",
        "desc": "Students are randomly selected by computerized lottery. General Education and 504 Plan Students: Preference is given to students with percentiles of 24 and above on the NWEA MAP in reading and math. A total of 30% of the seats will be made available to attendance area applicants.  IEP and EL students: Preference is given to students with combined NWEA MAP scores that equal 48 or above.  Note: Repeating 8th graders and students pushed into 8th grade from 6th grade due to age requirements qualify for selection but will be placed in a lower preference group.",
        "programs": [
            "BOGAN HS - Accounting - Selection",
        ],
      // custom req fn -- req fn builders a little ungainly for handling
      // this kind of branching.
      "fn": (s, p) => {
        if( ifSkipped7OrRepeated8(s,p) ) {
          return SuccessChance.UNLIKELY
        } else if ( ifIEPorEL(s,p) ) {
          const passesGrades = ifHasGrades({nweaCombined: 48})(s, p);
          if( passesGrades ) { 
            return SuccessChance.LIKELY;
          } else {
            return SuccessChance.UNCERTAIN;
          }

        } else {
          const passesGrades = ifHasGrades({nweaBoth: 24})(s, p);
          if ( passesGrades ) {
            return SuccessChance.LIKELY;
          } else {
            return SuccessChance.UNCERTAIN;
          }
        }
      }
    },
    "01ad18923e7e8de10e8fb09bb2c6722a": {
        "name": "",
        "desc": "Students are randomly selected by computerized lottery. General Education and 504 Plan Students: Preference is given to students with percentiles of 24 and above on the NWEA MAP in reading and math. A total of 30% of the seats will be made available to attendance area applicants.  IEP and EL students: Preference is given to students with combined NWEA MAP scores that equal 48 or above.  Note: Repeating 8th graders and students pushed into 8th grade from 6th grade due to age requirements qualify for selection but will be placed in a lower preference group.",
        "programs": [
            "CHICAGO VOCATIONAL HS - Cosmetology - Selection"
        ],
      // custom req fn -- req fn builders a little ungainly for handling
      // this kind of branching.
      "fn": (s, p) => {
        if( ifSkipped7OrRepeated8(s,p) ) {
          return SuccessChance.UNLIKELY
        } else if ( ifIEPorEL(s,p) ) {
          const passesGrades = ifHasGrades({nweaCombined: 48})(s, p);
          if( passesGrades ) { 
            return SuccessChance.LIKELY;
          } else {
            return SuccessChance.UNCERTAIN;
          }

        } else {
          const passesGrades = ifHasGrades({nweaBoth: 24})(s, p);
          if ( passesGrades ) {
            return SuccessChance.LIKELY;
          } else {
            return SuccessChance.UNCERTAIN;
          }
        }
      }
    },
    "965d710ce70f9e59e622f51311b5a986": {
        "name": "",
        "desc": "Students are randomly selected by computerized lottery. Preference is given to students with percentiles of 24 and above on the NWEA MAP in reading and math. A total of 30% of the seats will be made available to attendance area applicants.  IEP and EL students: Preference is given to students with combined NWEA MAP scores that equal 48 or above.  Note: Repeating 8th graders and students pushed into 8th grade from 6th grade due to age requirements qualify for selection but will be placed in a lower preference group.",
        "programs": [
            "DYETT ARTS HS - Digital Media - Selection",
        ],
      // custom req fn -- req fn builders a little ungainly for handling
      // this kind of branching.
      "fn": (s, p) => {
        if( ifSkipped7OrRepeated8(s,p) ) {
          return SuccessChance.UNLIKELY
        } else if ( ifIEPorEL(s,p) ) {
          const passesGrades = ifHasGrades({nweaCombined: 48})(s, p);
          if( passesGrades ) { 
            return SuccessChance.LIKELY;
          } else {
            return SuccessChance.UNCERTAIN;
          }

        } else {
          const passesGrades = ifHasGrades({nweaBoth: 24})(s, p);
          if ( passesGrades ) {
            return SuccessChance.LIKELY;
          } else {
            return SuccessChance.UNCERTAIN;
          }
        }
      }
    },
    "4ab864cc8934557f435c392c96e5cfc1": {
        "name": "",
        "desc": "Students who live within the school's attendance boundary can be admitted automatically.  Students who live outside of the school's attendance boundary are randomly selected by computerized lottery.\u00a0The lottery is conducted in the following order: sibling, general.",
        "programs": [
            "SCHURZ HS - General Education - Selection",
            "STEINMETZ HS - General Education - Selection"
        ],
      "fn": conditional(
        {
          filter: ifInAttendBound,
          fn: accept(everyone)
        },
        {
          filter: everyone,
          fn: lottery(
            SIBLING_LOTTERY_STAGE,
            GENERAL_LOTTERY_STAGE
          )
        }
      )
    },
    "ae1af40b734a31b447b1ed50f6e4bc17": {
        "name": "",
        "desc": "Minimum combined percentile of 48 in reading and math on NWEA MAP. Attendance at an Information Session is required for eligible applicants.",
        "programs": [
            "AIR FORCE HS - Service Learning Academies (Military) - Application",
            "MARINE LEADERSHIP AT AMES HS - Service Learning Academies (Military) - Application",
            "RICKOVER MILITARY HS - Service Learning Academies (Military) - Application",
            "PHOENIX MILITARY HS - Service Learning Academies (Military) - Application",
            "CARVER MILITARY HS - Service Learning Academies (Military) - Application",
            "CHICAGO MILITARY HS - Service Learning Academies (Military) - Application"
        ],
      "fn": accept(ifHasGrades({nweaCombined: 48}))
    },
    "9a6d8103474c5e8b4988360767a186de": {
        "name": "",
        "desc": "During the Information Session, students will sign a Commitment Agreement, complete a Motivation and Perseverance Assessment and write a brief essay. Selections are based on a point system with a maximum of 500 points, derived from 7th grade final (cumulative) grades (100 points), 7th grade NWEA MAP scores (150 points), the two-part assessment (50 for each part), and the essay (100 points).",
        "programs": [
            "AIR FORCE HS - Service Learning Academies (Military) - Selection"
        ],
      "fn": notImplemented
    },
    "459b0b1aaa6e44d897f0a720ba82369e": {
        "name": "",
        "desc": "Students who live within the school's attendance boundary can be admitted automatically.  Students who live outside of the school's attendance boundary will be randomly selected by computerized lottery. The lottery will be conducted in the following order: sibling, general.",
        "programs": [
            "JUAREZ HS - General Education - Selection"
        ],
      "fn": conditional(
        {
          filter: ifInAttendBound,
          fn: accept(everyone)
        },
        {
          filter: everyone,
          fn: lottery(
            SIBLING_LOTTERY_STAGE,
            GENERAL_LOTTERY_STAGE
          )
        }
      )
    },
    // FIXME: error in src file?
    "d41d8cd98f00b204e9800998ecf8427e": {
        "name": "",
        "desc": "",
        "programs": [
            "KELLY HS - Digital Media - Application"
        ],
      "fn": notImplemented
    },
    "2317c60e8a1eec08ab495a14ccfd9c64": {
        "name": "",
        "desc": "Students who live within the school's attendance boundary can be admitted automatically.  Students who live outside of the school's attendance boundary are randomly selected by computerized lottery.",
        "programs": [
            "RICHARDS HS - General Education - Selection",
            "TILDEN HS - General Education - Selection",
            "DYETT ARTS HS - General Education - Selection",
            "SOLORIO HS - General Education - Selection",
            "MATHER HS - General Education - Selection"
        ],
      "fn": conditional(
        {
          filter: ifInAttendBound,
          fn: accept(everyone)
        },
        {
          filter: everyone,
          fn: lottery(
            GENERAL_LOTTERY_STAGE
          )
        }
      )
    },
    "c32c0804dc719ba6c4c00322e7a69be2": {
        "name": "",
        "desc": "General Education and 504 Plan students: Minimum percentile of 45 in both reading and math on NWEA MAP.  IEP and EL students: Minimum NWEA MAP percentile of 50 in one subject (reading or math) and minimum NWEA MAP percentile of 40 in the other subject (reading or math).  Testing is required for all eligible applicants.",
        "programs": [
            "BROOKS HS - Academic Center - Application",
            "TAFT HS - Academic Center - Application",
            "LANE TECH HS - Academic Center - Application",
            "MORGAN PARK HS - Academic Center - Application",
            "KENWOOD HS - Academic Center - Application",
            "LINDBLOM HS - Academic Center - Application",
            "YOUNG HS - Academic Center - Application"
        ],
        // TODO remove Academic Center programs from list of cps programs and req fns
        "fn": notImplemented         
    },
    "224ce8807abceb6ca72e650988637629": {
        "name": "",
        "desc": "Students are selected on a point system with a maximum of 900 points. Students are assigned points for prior year final grades, NWEA MAP scores, and the admissions test, each worth a maximum of 300 points.",
        "programs": [
            "BROOKS HS - Academic Center - Selection",
            "TAFT HS - Academic Center - Selection",
            "LANE TECH HS - Academic Center - Selection",
            "MORGAN PARK HS - Academic Center - Selection",
            "KENWOOD HS - Academic Center - Selection",
            "LINDBLOM HS - Academic Center - Selection",
            "YOUNG HS - Academic Center - Selection"
        ],
        // TODO remove Academic Center programs from list of cps programs and req fns
        "fn": notImplemented
    },
    "03010a12030cab563c3f5d9115e7aabe": {
        "name": "",
        "desc": "General Education and 504 Plan students: Minimum percentile of 45 in both reading and math on NWEA MAP and minimum 2.0 GPA in 7th grade.  IEP and EL students: Minimum combined percentile of 90 in reading and math on NWEA MAP, and minimum 2.0 GPA in 7th grade.",
        "programs": [
            "STEINMETZ HS - JROTC - Application"
        ],
      "fn": conditional(
        {
          filter: ifIEPorEL,
          fn: accept(ifHasGrades({
            nweaCombined: 90,
            gpa: 2.0
          }))
        },
        {
          filter: everyone,
          fn: accept(ifHasGrades({
            nweaBoth: 45,
            gpa: 2.0
          }))
        }
      )
    },
    "5096cc5a97943badb78efd427ee13eb6": {
        "name": "",
        "desc": "Eligible students are randomly selected by computerized lottery.",
        "programs": [
            "STEINMETZ HS - JROTC - Selection"
        ],
      "fn": lottery(
        GENERAL_LOTTERY_STAGE
      )
    },
    "f6b1cadaa52f894d87ad4246bd4c9b0a": {
        "name": "",
        "desc": "Students are randomly selected by computerized lottery. The lottery is conducted in the following order: sibling, proximity, general.",
        "programs": [
            "DOUGLASS HS - General Education - Selection",
            "WILLIAMS HS - General Education - Selection",
            "SENN HS - Digital Journalism - Selection",
            "NORTH LAWNDALE - CHRISTIANA HS - General Education - Selection",
            "NORTH LAWNDALE - COLLINS HS - General Education - Selection"
        ],
      "fn": lottery(
        SIBLING_LOTTERY_STAGE,
        PROXIMITY_LOTTERY_STAGE,
        GENERAL_LOTTERY_STAGE
      )
    },
    "77620df9b5c4a530f21c30267af843ce": {
        "name": "",
        "desc": "General Education and 504 Plan students: Minimum percentile of 24 in both reading and math on NWEA MAP.  IEP and EL students: Minimum combined percentile of 48 in reading and math on NWEA MAP. An audition/portfolio review is required.",
        "programs": [
            "CURIE HS - Dance - Application",
            "CURIE HS - Music - Application",
            "CURIE HS - Visual Arts - Application"
        ],
      "fn": conditional(
        {
          filter: ifIEPorEL,
          fn: accept(ifHasGrades({
            nweaCombined: 48
          }))
        },
        {
          filter: everyone,
          fn: accept(ifHasGrades({
            nweaBoth: 24
          }))
        }
      )
    },
    "7e51568fc748dec3fd5aa79aae428009": {
        "name": "",
        "desc": "Students are selected on a point system. Points are based on the student's NWEA MAP scores in reading and math, 7th grade final (cumulative) grades, and the audition.",
        "programs": [
            "CURIE HS - Dance - Selection",
            "SENN HS - Dance - Selection",
            "CURIE HS - Music - Selection",
            "SENN HS - Music - Selection",
            "SENN HS - Theatre - Selection",
            "CURIE HS - Visual Arts - Selection"
        ],
      "fn": notImplemented
    },
    "0514de51e21823dae4f43b085538f9e6": {
        "name": "",
        "desc": "General Education and 504 Plan students: Minimum percentile of 24 in both reading and math on NWEA MAP, minimum 3.0 GPA in 7th grade, and minimum attendance percentage of 95.  IEP and EL students: Minimum combined percentile of 48 in reading and math on NWEA MAP, minimum 3.0 GPA in 7th grade, and minimum attendance percentage of 95.",
        "programs": [
            "WESTINGHOUSE HS - Career Academy - Application"
        ],
      "fn": conditional(
        {
          filter: ifIEPorEL,
          fn: accept(ifHasGrades({
            nweaCombined: 48,
            gpa: 3.0,
            attendance: 95
          }))
        },
        {
          filter: everyone,
          fn: accept(ifHasGrades({
            nweaBoth: 24,
            gpa: 3.0,
            attendance: 95
          }))
        }
      )
    },
    "d76c385b612c2ef53c62501b074b6134": {
        "name": "",
        "desc": "Students are randomly selected by compterized lottery. The lottery is conducted in the following order: proximity, general.",
        "programs": [
            "WESTINGHOUSE HS - Career Academy - Selection"
        ],
      "fn": lottery(
        PROXIMITY_LOTTERY_STAGE,
        GENERAL_LOTTERY_STAGE
      )
    },
    "5ee7cff3803c80e025f483be28b57f06": {
        "name": "",
        "desc": "This program only accepts students who live within the school's attendance boundary or who attend a Grow Community School (Audubon, Bell, Blaine, Budlong, Burley, Chappell, Coonley, Greeley, Hamilton, Hawthorne, Inter-American, Jahn, Jamieson, McPherson, Nettelhorst, Ravenswood, or Waters). Students are randomly selected by computerized lottery.",
        "programs": [
            "LAKE VIEW HS - General Education - Selection"
        ],
      "fn": lottery(
        {
          filter: either(ifInAttendBound, ifStudentAttendsOneOf(...GROW_COMMUNITY_SCHOOL_ES_PROGRAMS)),
          size: LotteryStageSize.LARGE
        }
      )
    },
    "930c01733b718c40bc1f2af23839e14a": {
        "name": "",
        "desc": "General Education and 504 Plan students: Minimum percentile of 24 in both reading and math on NWEA MAP and minimum 2.5 GPA in 7th grade.  IEP and EL students: Minimum combined percentile of 48 in reading and math on NWEA MAP and minimum 2.5 GPA in 7th grade.  Attendance at an Information Session is required for all eligible applicants.",
        "programs": [
            "KELLY HS - International Baccalaureate (IB) - Application",
            "SOUTH SHORE INTL HS - International Baccalaureate (IB) - Application",
            "BACK OF THE YARDS HS - International Baccalaureate (IB) - Application",
            "PROSSER HS - International Baccalaureate (IB) - Application",
            "STEINMETZ HS - International Baccalaureate (IB) - Application",
            "MORGAN PARK HS - International Baccalaureate (IB) - Application",
            "TAFT HS - International Baccalaureate (IB) - Application",
            "BOGAN HS - International Baccalaureate (IB) - Application",
            "JUAREZ HS - International Baccalaureate (IB) - Application",
            "OGDEN HS - International Baccalaureate (IB) - Application",
            "KENNEDY HS - International Baccalaureate (IB) - Application",
            "AMUNDSEN HS - International Baccalaureate (IB) - Application",
            "WASHINGTON HS - International Baccalaureate (IB) - Application",
            "SCHURZ HS - International Baccalaureate (IB) - Application"
        ],
      "fn": conditional(
        {
          filter: ifIEPorEL,
          fn: accept(ifHasGrades({
            nweaCombined: 48,
            gpa: 2.5
          }))
        },
        {
          filter: everyone,
          fn: accept(ifHasGrades({
            nweaBoth: 24,
            gpa: 2.5
          }))
        }
      )
    },
    "11bdd4bc6af64732a32d73a850bc78a4": {
        "name": "",
        "desc": "Students are selected on an overall applicant score. Points are based on NWEA MAP scores and 7th grade GPA. Students who live within the school's attendance boundary will be given 50 additional points.The school determines the minimum cutoff score for selections.",
        "programs": [
            "KELLY HS - International Baccalaureate (IB) - Selection",
            "BACK OF THE YARDS HS - International Baccalaureate (IB) - Selection",
            "JUAREZ HS - International Baccalaureate (IB) - Selection"
        ],
      "fn": ibPointSystem
    },
    "f79604e9d7984cc9b43fa3c69abe428d": {
        "name": "",
        "desc": "During the Information Session, students will sign a Commitment Agreement, complete a Motivation and Perseverance Assessment and write a brief essay. Selections will be based on a point system with a maximum of 500 points, derived from 7th grade final (cumulative) grades (100 points), 7th grade NWEA MAP scores (150 points), the two-part assessment (50 for each part), and the essay (100 points).",
        "programs": [
            "MARINE LEADERSHIP AT AMES HS - Service Learning Academies (Military) - Selection",
            "RICKOVER MILITARY HS - Service Learning Academies (Military) - Selection",
            "PHOENIX MILITARY HS - Service Learning Academies (Military) - Selection",
            "CARVER MILITARY HS - Service Learning Academies (Military) - Selection",
            "CHICAGO MILITARY HS - Service Learning Academies (Military) - Selection"
        ],
      "fn": notImplemented
    },
    "4cb799c1cf8b41a3baf1e8d9176463d8": {
        "name": "",
        "desc": "General Education and 504 Plan students: Minimum percentile of 24 in both reading and math on NWEA MAP.  IEP and EL students: Minimum combined percentile of 48 in reading and math on NWEA MAP.",
        "programs": [
            "JONES HS - Pre-Engineering - Application",
            "CRANE MEDICAL HS - Health Sciences - Application",
            "CHICAGO AGRICULTURE HS - Agricultural Sciences - Application",
            "HANCOCK HS - Pre-Law - Application",
            "HANCOCK HS - Pre-Engineering - Application",
            "JONES HS - Pre-Law - Application",
            "VON STEUBEN HS - Science - Application",
            "CLARK HS - Early College STEM - Application",
            "DISNEY II HS - Fine Arts & Technology - Application"
        ],
      "fn": conditional(
        {
          filter: ifIEPorEL,
          fn: accept(ifHasGrades({
            nweaCombined: 48
          }))
        },
        {
          filter: everyone,
          fn: accept(ifHasGrades({
            nweaBoth: 24
          }))
        }
      )
    },
    "0fe94ad9490cc5fe33139f705336bf3d": {
        "name": "",
        "desc": "Students are selected on a point system. Points are based on 7th grade final GPA and 7th grade stanines. Students are ranked and selected from high to low. Students residing within the attendance overlay boundary of the school are selected first.",
        "programs": [
            "JONES HS - Pre-Engineering - Selection"
        ],
      "fn": notImplemented
    },
    "0fedde2a8081243a74d2c6a3be90b411": {
        "name": "",
        "desc": "Students are selected on an overall applicant score. Points are based on NWEA MAP scores and 7th grade GPA. Students who live within the school's attendance boundary will be given 50 additional points. The school determines the minimum cutoff score for selections.",
        "programs": [
            "SOUTH SHORE INTL HS - International Baccalaureate (IB) - Selection",
            "CLEMENTE HS - International Baccalaureate (IB) - Selection",
            "STEINMETZ HS - International Baccalaureate (IB) - Selection",
            "HUBBARD HS - International Baccalaureate (IB) - Selection",
            "BOGAN HS - International Baccalaureate (IB) - Selection",
            "KENNEDY HS - International Baccalaureate (IB) - Selection",
            "BRONZEVILLE HS - International Baccalaureate (IB) - Selection",
            "WASHINGTON HS - International Baccalaureate (IB) - Selection",
            "SCHURZ HS - International Baccalaureate (IB) - Selection"
        ],
      "fn": ibPointSystem
    },
    "70d67060ab98f9cd752d741b32e207ba": {
        "name": "",
        "desc": "Student selections are based on points. Students are assigned points for 7th grade final GPA and 7th grade stanines. Each school determines a minimum cutoff score for selections.",
        "programs": [
            "ROOSEVELT HS - Medical & Health Careers - Selection",
            "NORTH-GRAND HS - Pre-Engineering - Selection",
            "NORTH-GRAND HS - Allied Health - Selection",
            "SCHURZ HS - Allied Health - Selection",
            "RABY HS - Pre-Law - Selection",
            "MATHER HS - Pre-Law - Selection",
            "ROOSEVELT HS - Cisco Networking - Selection"
        ],
      "fn": notImplemented
    },
    "eb6acf17c18f9a5177bcdb7a4504672a": {
        "name": "",
        "desc": "Minimum percentile of 40 in both reading and math on NWEA MAP, minimum 3.0 GPA in 7th grade, LAS Links Assessment composite of 4 or STAMP Assessment at the Intermediate Level.",
        "programs": [
            "SCHURZ HS - Dual Language - Application",
            "BACK OF THE YARDS HS - Dual Language - Application"
        ],
      "fn": notImplemented
    },
    "0640ddea233c6c9c97db5dd816b5c24a": {
        "name": "",
        "desc": "Students are randomly selected by computerized lottery. The lottery is conducted in the following order: sibling, students currently enrolled in a CPS elementary school with a world language or dual language program, general.",
        "programs": [
            "SCHURZ HS - Dual Language - Selection",
            "BACK OF THE YARDS HS - Dual Language - Selection"
        ],
      // TODO -- if/when application stage is sorted out, find lists of cps schools with dual language and world language programs
      "fn": lottery(
        SIBLING_LOTTERY_STAGE,
        /*{
          filter: ifStudentAttendsOneOf(CPS_DUAL_LANGUAGE_WORLD_LANGUAGE_ES_PROGRAMS),
          size: LotteryStageSize.LARGE,
        },*/
        GENERAL_LOTTERY_STAGE
      )
    },
    "8c1dffabe7825704cbe29a12138cc4d9": {
        "name": "",
        "desc": "Students currently enrolled in the school's eighth grade will have a deadline to submit their intent to enroll in ninth grade. For remaining seats, students are randomly selected by computerized lottery. The lottery is conducted in the following order: sibling, general.",
        "programs": [
            "CHICAGO MATH & SCIENCE HS - General Education - Selection",
        ],
      "fn": conditional(
        {
          filter: ifStudentAttendsOneOf(CHICAGO_MATH_AND_SCIENCE_GENERAL_EDUCATION_JOINT_ES_HS_PROGRAM),
          fn: accept(everyone)
          
        },
        {
          filter: everyone, 
          fn: lottery(
            SIBLING_LOTTERY_STAGE,
            GENERAL_LOTTERY_STAGE
          )
        }
      )
    },
    "8c1dffabe7825704cbe29a12138cc4d0": {
        "name": "",
        "desc": "Students currently enrolled in the school's eighth grade will have a deadline to submit their intent to enroll in ninth grade. For remaining seats, students are randomly selected by computerized lottery. The lottery is conducted in the following order: sibling, general.",
        "programs": [
            "CICS - CHICAGOQUEST HS - General Education - Selection"
        ],
      // NOTE previously CICS - CHICAGOQUEST HS - General Education - Selection had req fn id 8c1dffabe7825704cbe29a12138cc4d9
      //  -- was changed because both it and CHICAGO MATH & SCIENCE HS had identical req fn descriptions referring to 'this school'
      "fn": conditional(
        {
          filter: ifStudentAttendsOneOf(
            CICS_CHICAGOQUEST_GENERAL_EDUCATION_JOINT_ES_HS_PROGRAM
          ),
          fn: accept(everyone)
        },
        {
          filter: everyone, 
          fn: lottery(
            SIBLING_LOTTERY_STAGE,
            GENERAL_LOTTERY_STAGE
          )
        }
      )
    },
    "70b7c4a5e527fb50d69ea37b000765d8": {
        "name": "",
        "desc": "Minimum percentile of 70 in both reading and math on NWEA MAP, minimum 3.0 GPA in 7th grade, and minimum attendance percentage of 93.",
        "programs": [
            "CHICAGO ACADEMY HS - Scholars - Application"
        ],
      "fn": accept(ifHasGrades({
        nweaBoth: 70,
        gpa: 3.0,
        attendance: 93
      }))
    },
    "1d126a086436d78661af2cb249938c72": {
        "name": "",
        "desc": "Students who live within the school's attendance boundary have no eligibility requirements.  Students who live outside of the school's attendance boundary: Minimum attendance percentage of 92.",
        "programs": [
            "MULTICULTURAL HS - Fine and Performing Arts - Application"
        ],
      "fn": conditional(
        {
          filter: ifInAttendBound,
          fn: accept(everyone)
        },
        {
          filter: everyone,
          fn: accept(ifHasGrades({
            attendance: 92
          }))
        }
      )
    },
    "c36c294e63476a7959123bfe85a2c639": {
        "name": "",
        "desc": "Students who live within the school's attendance boundary have no eligibility requirements and can be admitted automatically.  Eligible students who live outside of the school's attendance boundary are randomly selected by computerized lottery. The lottery is conducted in the following order: sibling, general.",
        "programs": [
            "MULTICULTURAL HS - Fine and Performing Arts - Selection",
            "CLEMENTE HS - General Education - Selection",
            "PHILLIPS HS - General Education - Selection"
        ],
      "fn": conditional(
        {
          filter: ifInAttendBound,
          fn: accept(everyone)
        },
        {
          filter: everyone,
          fn: lottery(
            SIBLING_LOTTERY_STAGE,
            GENERAL_LOTTERY_STAGE
          )
        }
      )
    },
    "889af44e3306313029109d465b1c2de6": {
        "name": "",
        "desc": "Students who live within the school's attendance boundary have no eligibility requirements.  Students who live outside of the school's attendance boundary: Minimum GPA of 2.5 in 7th grade and minimum attendance percentage of 85.",
        "programs": [
            "CLEMENTE HS - General Education - Application"
        ],
      "fn": conditional(
        {
          filter: ifInAttendBound,
          fn: accept(everyone)
        },
        {
          filter: everyone,
          fn: accept(ifHasGrades({
            gpa: 2.5,
            attendance: 85
          }))
        }
      )

    },
    "6a02d16ba52a69b937a74a43c6a82769": {
        "name": "",
        "desc": "General Education and 504 Plan students: Minimum percentile of 24 in both reading and math on NWEA MAP and minimum 2.5 GPA in 7th grade.  IEP and EL students: Minimum combined percentile of 48 in reading and math on NWEA MAP and minimum 2.5 GPA in 7th grade.  Attendance is required at an Information Session for all eligible applicants.",
        "programs": [
            "CLEMENTE HS - International Baccalaureate (IB) - Application",
            "CURIE HS - International Baccalaureate (IB) - Application",
            "FARRAGUT HS - International Baccalaureate (IB) - Application",
            "BRONZEVILLE HS - International Baccalaureate (IB) - Application",
            "HYDE PARK HS - International Baccalaureate (IB) - Application"
        ],
      "fn": conditional(
        {
          filter: ifIEPorEL,
          fn: accept(ifHasGrades({
            nweaCombined: 48,
            gpa: 2.5
          }))
        },
        {
          filter: everyone,
          fn: accept(ifHasGrades({
            nweaBoth: 24,
            gpa: 2.5
          }))
        }
      )
    },
    "1a043655763ab140a0d14f5080d63a2c": {
        "name": "",
        "desc": "General Education and 504 Plan students: Minimum percentile of 24 in both reading and math on NWEA MAP.  IEP and EL students: Minimum combined percentile of 48 in reading and math on NWEA MAP.  Testing is required for all eligible applicants.",
        "programs": [
            "BROOKS HS - Selective Enrollment High School - Application",
            "YOUNG HS - Selective Enrollment High School - Application",
            "SOUTH SHORE INTL HS - Selective Enrollment High School - Application",
            "WESTINGHOUSE HS - Selective Enrollment High School - Application",
            "LANE TECH HS - Selective Enrollment High School - Application",
            "HANCOCK HS - Selective Enrollment High School - Application",
            "LINDBLOM HS - Selective Enrollment High School - Application",
            "KING HS - Selective Enrollment High School - Application",
            "PAYTON HS - Selective Enrollment High School - Application",
            "JONES HS - Selective Enrollment High School - Application"
        ],
      "fn": conditional(
        {
          filter: ifIEPorEL,
          fn: accept(ifHasGrades({
            nweaCombined: 48
          }))
        },
        {
          filter: everyone,
          fn: accept(ifHasGrades({
            nweaBoth: 24
          }))
        }
      )
   },
    "bd680e7bc10c03552140e26736221cf7": {
        "name": "",
        "desc": "Students are selected on a point system with a maximum of 900 points. Students are assigned points for 7th grade final grades, NWEA MAP scores, and the admissions test, each worth a maximum of 300 points.",
        "programs": [
            "BROOKS HS - Selective Enrollment High School - Selection",
            "YOUNG HS - Selective Enrollment High School - Selection",
            "NORTHSIDE PREP HS - Selective Enrollment High School - Selection",
            "SOUTH SHORE INTL HS - Selective Enrollment High School - Selection",
            "WESTINGHOUSE HS - Selective Enrollment High School - Selection",
            "LANE TECH HS - Selective Enrollment High School - Selection",
            "HANCOCK HS - Selective Enrollment High School - Selection",
            "LINDBLOM HS - Selective Enrollment High School - Selection",
            "KING HS - Selective Enrollment High School - Selection",
            "JONES HS - Selective Enrollment High School - Selection"
        ],
      "fn": sePointSystem
    },
    "94f10272b6ff9ee947b6c7f8e9adc98c": {
        "name": "",
        "desc": "Minimum percentile of 24 in both reading and math on NWEA MAP. An interview is required for applicants.",
        "programs": [
            "TAFT HS - NJROTC - Application"
        ],
      "fn": accept(ifHasGrades({
        nweaBoth: 24
      }))
    },
    "29034b3dd211fc6857c0762ea4431354": {
        "name": "",
        "desc": "Students are selected on a point system. Points are based on the student's NWEA MAP scores and the interview.",
        "programs": [
            "TAFT HS - NJROTC - Selection"
        ],
      "fn": notImplemented
    },
    "7ca8e42afc3b2240bdc21e9b02a9b6ff": {
        "name": "",
        "desc": "Students who live within the school's attendance boundary have no eligibility requirements.  Students who live outside of the school's attendance boundary: Minimum percentile of 60 in both reading and math on NWEA MAP and minimum 2.75 GPA in 7th grade. An audition is required for students who live outside of the school's attendance boundary.",
        "programs": [
            "LINCOLN PARK HS - Vocal Music - Application"
        ],
      "fn": conditional(
        {
          filter: ifInAttendBound,
          fn: accept(everyone)
        },
        {
          filter: everyone,
          fn: accept(ifHasGrades({
            nweaBoth: 60,
            gpa: 2.75
          }))
        }
      )
    },
    "abfbe30160c0ed3a6d925da2f6fbe7d6": {
        "name": "",
        "desc": "Students who live within the school's attendance boundary have no eligibility/audition requirements and can be admitted automatically.  Students who live outside of the school's attendance boundary are selected on a point system. Points are based on the student's NWEA MAP scores in reading and math, 7th grade GPA, and the audition.",
        "programs": [
            "LINCOLN PARK HS - Vocal Music - Selection",
            "LINCOLN PARK HS - Instrumental Music - Selection"
        ],
      "fn": conditional(
        {
          filter: ifInAttendBound,
          fn: accept(everyone)
        },
        {
          filter: everyone,
          fn: notImplemented
        }
      )
    },
    "9653c4a2af98c756aaeeaa36980f9dc5": {
        "name": "",
        "desc": "Students who live within the school's attendance boundary have no eligibility requirements.  Students who live outside of the school's attendance boundary: General Education and 504 Plan students: Minimum percentile of 24 in both reading and math on NWEA MAP, minimum 2.5 GPA in 7th grade, and minimum attendance percentage of 90.  IEP and EL students: Minimum combined percentile of 24 in reading and math on NWEA MAP, and minimum attendance percentage of 90.",
        "programs": [
            "PHILLIPS HS - General Education - Application"
        ],
      "fn": conditional(
        {
          filter: ifInAttendBound,
          fn: accept(everyone)
        },
        {
          filter: ifIEPorEL,
          fn: accept(ifHasGrades({
            nweaCombined: 24,
            attendance: 90
          }))
        },
        {
          filter: everyone,
          fn: accept(ifHasGrades({
            nweaBoth: 24,
            gpa: 2.5,
            attendance: 90
          }))
        }
      )
    },
    "49bc52caf46148ee777e8d3534f22700": {
        "name": "",
        "desc": "Students are randomly selected by computerized lottery. The lottery is conducted in the following order: sibling, proximity, tiers.",
        "programs": [
            "CRANE MEDICAL HS - Health Sciences - Selection",
            "CHICAGO AGRICULTURE HS - Agricultural Sciences - Selection",
            "VON STEUBEN HS - Science - Selection",
            "CLARK HS - Early College STEM - Selection",
            "DISNEY II HS - Fine Arts & Technology - Selection"
        ],
      // TODO: ...tiers? Currently, 'everyone'/GENERAL_LOTTERY_STAGE is used as the lottery stage filter here, as it's expected the tiers lottery won't advantage any particular students,
      // at least not in a noticeable way.
      "fn": lottery(
        SIBLING_LOTTERY_STAGE,
        PROXIMITY_LOTTERY_STAGE,
        GENERAL_LOTTERY_STAGE
      )
    },
    "3c0f47771fc40565978a3a894bd96705": {
        "name": "",
        "desc": "Minimum percentile of 50 in both reading and math on NWEA MAP, and minimum 2.0 GPA in 7th grade.",
        "programs": [
            "FENGER HS - Honors - Application"
        ],
      "fn": accept(ifHasGrades({
        nweaBoth: 50,
        gpa: 2.0
      }))
    },
    "308d8156364219130aef9a7de30a6c8d": {
        "name": "",
        "desc": "Students are randomly selected by computerized lottery.",
        "programs": [
            "FENGER HS - Honors - Selection",
            "CHICAGO VIRTUAL - General Education - Selection",
            "KENWOOD HS - Honors - Selection",
            "HUBBARD HS - University Scholars - Selection",
            "DUNBAR HS - Career Academy - Selection",
            "BRONZEVILLE HS - Honors - Selection",
            "ACE TECH HS - General Education - Selection",
            "MORGAN PARK HS - World Language and International Studies - Selection",
            "CHICAGO TECH HS - Science/Technology/Engineering/Math - Selection"
        ],
      "fn": lottery(
        GENERAL_LOTTERY_STAGE
      )
    },
    "ab7e9a52b2c607977c432dd5f27c6fe9": {
        "name": "",
        "desc": "Students are selected on an overall applicant score. Points are based on NWEA MAP scores and 7th grade GPA. Students who live within the school's attendance boundary will be given 50 additional points. Each school selects a minimum cutoff score for selections.",
        "programs": [
            "PROSSER HS - International Baccalaureate (IB) - Selection"
        ],
      "fn": ibPointSystem
    },
    "8f4240fa22d2281a32186e7a65e75011": {
        "name": "",
        "desc": "Spry is a three-year, year-round school. Students are randomly selected by computerized lottery. The lottery is conducted in the following order: sibling, general.",
        "programs": [
            "SPRY HS - General Education - Selection"
        ],
      "fn": lottery(
        SIBLING_LOTTERY_STAGE,
        GENERAL_LOTTERY_STAGE
      )
    },
    "b4dc6bde064d3f16c8bed871ea0cee30": {
        "name": "",
        "desc": "Minimum percentile of 50 in reading on NWEA MAP, minimum 2.0 GPA in 7th grade, and minimum attendance percentage of 80.",
        "programs": [
            "KELLY HS - AVID - Application"
        ],
      "fn": accept(ifHasGrades({
        nweaBoth: 50,
        gpa: 2.0,
        attendance: 80
      }))
    },
    "4ce6d6733bff330b780bc8390660d7cf": {
        "name": "",
        "desc": "Students will be selected based on teacher recommendation letter(s) and an interview process.",
        "programs": [
            "KELLY HS - AVID - Selection"
        ],
      "fn": notImplemented
    },
    "cb7238b523517845746779fe18ea174a": {
        "name": "",
        "desc": "General Education and 504 Plan students: Minimum percentile of 24 in both reading and math on NWEA MAP.   IEP and EL students: Minimum combined percentile of 48 in reading and math on NWEA MAP.  Testing is required for all eligible applicants.",
        "programs": [
            "NORTHSIDE PREP HS - Selective Enrollment High School - Application"
        ],
      "fn": conditional(
        {
          filter: ifIEPorEL,
          fn: accept(ifHasGrades({
            nweaCombined: 48
          }))
        },
        {
          filter: everyone,
          fn: accept(ifHasGrades({
            nweaBoth: 24
          }))
        }
      )
    },
    "14673a83b42347d3fdc6f2fa445c4d2f": {
        "name": "",
        "desc": "Student selections are based on points. Students are assigned points for 7th grade final GPA and 7th grade stanines. Students are ranked and selected from high to low. Students residing within the attendance overlay boundary of the school are selected first.",
        "programs": [
            "HANCOCK HS - Pre-Law - Selection",
            "HANCOCK HS - Pre-Engineering - Selection"
        ],
      "fn": notImplemented
    },
    "3d1c7a20cb38789ce4b0f651200dd9cd": {
        "name": "",
        "desc": "Minimum percentile of 75 in both reading and math on NWEA MAP, minimum 3.5 GPA in 7th grade, and minimum attendance percentage of 95.",
        "programs": [
            "KENWOOD HS - Honors - Application"
        ],
      "fn": accept(ifHasGrades({
        nweaBoth: 75,
        gpa: 3.5,
        attendance: 95
      }))
    },

    "027fe7b2d9fd7d9c6e55de49f723852f": {
        "name": "",
        "desc": "General Education and 504 Plan students: Minimum combined percentile of 40 in reading and math on NWEA MAP, minimum 2.5 GPA in 7th grade, and minimum attendance percentage of 90.  IEP and EL students: Minimum combined percentile of 30 in reading and math on NWEA MAP, and minimum attendance percentage of 90.",
        "programs": [
            "SIMEON HS - Career Academy - Application"
        ],
      "fn": conditional(
        {
          filter: ifIEPorEL,
          fn: accept(ifHasGrades({
            nweaCombined: 30,
            attendance: 90
          }))
        },
        {
          filter: everyone,
          fn: accept(ifHasGrades({
            nweaCombined: 40,
            gpa: 2.5,
            attendance: 90
          }))
        }
      )
    },
    "47befdd406dee45058f2dbd64a097154": {
        "name": "",
        "desc": "Students are selected on a point system. Points are based on the combined NWEA MAP scores and the interview.",
        "programs": [
            "SIMEON HS - Career Academy - Selection",
            "SIMEON HS - Honors - Selection"
        ],
      "fn": notImplemented
    },
    "39fbe111b62498337fb2f7973a18e570": {
        "name": "",
        "desc": "Students who live within the school's attendance boundary have no eligibility requirements.  Students who live outside of the school's attendance boundary: General Education and 504 Plan students: Minimum percentile of 24 in both reading and math on NWEA MAP and minimum attendance percentage of 85.  IEP and EL students: Minimum combined percentile of 40 in reading and math on NWEA MAP and minimum attendance percentage of 85.",
        "programs": [
            "HARLAN HS - General Education - Application"
        ],
      "fn": conditional(
        {
          filter: ifInAttendBound,
          fn: accept(everyone)
        },
        {
          filter: ifIEPorEL,
          fn: accept(ifHasGrades({
            nweaCombined: 40,
            attendance: 85
          }))
        },
        {
          filter: everyone,
          fn: accept(ifHasGrades({
            nweaBoth: 24,
            attendance: 85
          }))
        }
      )
    },
    "3e4ad403b3a6a2e998cd7d7b7d179091": {
        "name": "",
        "desc": "Students who live within the school's attendance boundary have no eligibilty requirements and can be admitted automatically.  Eligible students who live outside of the school's attendance boundary are randomly selected by computerized lottery. The lottery is conducted in the following order: sibling, general.",
        "programs": [
            "HARLAN HS - General Education - Selection"
        ],
      "fn": conditional(
        {
          filter: ifInAttendBound,
          fn: accept(everyone)
        },
        {
          filter: everyone,
          fn: lottery(
            SIBLING_LOTTERY_STAGE,
            GENERAL_LOTTERY_STAGE
          )
        }
      )
    },
    "f2829bdd4c9bc67e01b90bdd3db46c07": {
        "name": "",
        "desc": "Minimum percentile of 50 in both reading and math on NWEA MAP, minimum 3.0 GPA in 7th grade, and minimum attendance percentage of 90.",
        "programs": [
            "SIMEON HS - Honors - Application"
        ],
      "fn": accept(ifHasGrades({
        nweaBoth: 50,
        gpa: 3.0,
        attendance: 90
      }))
    },
    "c66032656bbf52edb1c9d6b62ca2e2eb": {
        "name": "",
        "desc": "Students who live within the school's attendance boundary have no eligibility requirements.  Students who live outside of the school's attendance boundary: Minimum combined percentile of 135 in reading and math on NWEA MAP and minimum 3.0 GPA in 7th grade.",
        "programs": [
            "LINCOLN PARK HS - Honors/Double Honors - Application"
        ],
      "fn": conditional(
        {
          filter: ifInAttendBound,
          fn: accept(everyone)
        },
        {
          filter: everyone,
          fn: accept(ifHasGrades({
            nweaCombined: 135,
            gpa: 3.0
          }))
        }
      )
    },
    "1558a52d4663a54c6a5f06fa10062961": {
        "name": "",
        "desc": "Students who live within the school's attendance boundary have no eligibility requirements and can be admitted automatically.  Eligible students who live outside the school's attendance boundary are selected on a point system. Points are based on the student's NWEA MAP scores in reading and math and 7th grade GPA.",
        "programs": [
            "LINCOLN PARK HS - Honors/Double Honors - Selection"
        ],
      "fn": conditional(
        {
          filter: ifInAttendBound, 
          fn: accept(everyone)
        },
        {
          filter: everyone,
          fn: notImplemented
        }
      )
    },
    "f4491f6cf1ebf200770f01271d93ba47": {
        "name": "",
        "desc": "Minimum percentile of 80 in both reading and math on NWEA MAP and minimum 3.5 GPA in 7th grade.",
        "programs": [
            "CHICAGO AGRICULTURE HS - Scholars - Application"
        ],
      "fn": accept(ifHasGrades({
        nweaBoth: 80,
        gpa: 3.5
      }))
    },
    "1976701fe4ffdbf53913f7f638f61b26": {
        "name": "",
        "desc": "Students are randomly selected by computerized lottery. Preference is given to students with a sibling who is currently enrolled and will be enrolled in the upcoming school year.",
        "programs": [
            "CHICAGO AGRICULTURE HS - Scholars - Selection",
            "HARLAN HS - Pre-Engineering - Selection",
            "CHICAGO AGRICULTURE HS - Honors - Selection"
        ],
      "fn": lottery(
        SIBLING_LOTTERY_STAGE,
        GENERAL_LOTTERY_STAGE
      )
    },
    "736b7d124b6930cf8ae642563037eeb9": {
        "name": "",
        "desc": "Attendance at an Information Session is not required, but preference is given to students who attend an Information Session.",
        "programs": [
            "GOODE HS - Early College STEM - Application"
        ],
      // TODO: how to handle this??
      "fn": accept(everyone)
    },
    "85463a98c5a7ba21313aacdaeda48cd0": {
        "name": "",
        "desc": "Students are randomly selcted by computerized lottery. The lottery is conducted in the following order: students who live within the school's overlay boundary and attend an Information Session; students who live within the school's network and attend an Information Session; students who live outside of the network and attend an Information Session; students who live within the school's overlay boundary and do not attend an Information Session; students who live within the school's network and do not attend an Information Session; students who live outside of the network and do not attend an Information Session.",
        "programs": [
            "GOODE HS - Early College STEM - Selection"
        ],
      // TODO incorporate info session?
      // TODO what is school's 'network'?
      "fn": notImplemented
    },
    "8ccbd2eb3d4e026932b83ee576862b16": {
        "name": "",
        "desc": "General Education and 504 Plan students: Minimum percentile of 24 in both reading and math on NWEA MAP.  IEP and EL students: Minimum combined percentile of 48 in reading and math on NWEA MAP.  An audition is required for all eligible applicants.",
        "programs": [
            "SENN HS - Dance - Application",
            "SENN HS - Music - Application",
            "SENN HS - Theatre - Application"
        ],
      "fn": conditional(
        {
          filter: ifIEPorEL,
          fn: accept(ifHasGrades({
            nweaCombined: 48
          }))
        },
        {
          filter: everyone,
          fn: accept(ifHasGrades({
            nweaBoth: 24
          }))
        }
      )
    },
    "7e054e33cdc685f9b099a243e45f0386": {
        "name": "",
        "desc": "Minimum 2.5 GPA in 7th grade.",
        "programs": [
            "ROBESON HS - Allied Health - Application"
        ],
      "fn": accept(ifHasGrades({
        gpa: 2.5
      }))
    },
    "b3b514880eaa7b9a4db6d6b6308eb1f7": {
        "name": "",
        "desc": "Students are selected on an overall applicant score. Points are based on NWEA MAP scores and 7th grade GPA. Students who live within the school's attendance boundary will be given 50 additional points. The school selects the minimum cutoff score for selections. Preference is given to students who meet the minimum eligibility requirements, attend an Information Session, and are enrolled in the school\u2019s Academic Center.",
        "programs": [
            "MORGAN PARK HS - International Baccalaureate (IB) - Selection"
        ],
      "fn": ibPointSystem
    },
    "7574e7fa48dfdf030b059dbaff5351b6": {
        "name": "",
        "desc": "Students are randomly selected by computerized lottery. The lottery is conducted in the following order: sibling; students who attend Brennemann, Courtenay, or McCutcheon Elementary Schools; general.",
        "programs": [
            "UPLIFT HS - General Education - Selection"
        ],
      "fn": lottery(
        SIBLING_LOTTERY_STAGE,
        {
          filter: ifStudentAttendsOneOf(
            BRENNEMANN_ES_PROGRAM, 
            COURTENAY_ES_PROGRAM, 
            MCCUTCHEON_ES_PROGRAM
          ),
          size: LotteryStageSize.LARGE
        },
        GENERAL_LOTTERY_STAGE
      )
    },
    "f9d7148f613933f83ad7d81004715614": {
        "name": "",
        "desc": "Students are randomly selected by computerized lottery. The lottery is conducted in the following order: students currently enrolled at the University of Chicago Woodlawn, sibling, proximity, general.",
        "programs": [
            "U OF C - WOODLAWN HS - General Education - Selection"
        ],
      "fn": lottery(
        {
          filter: ifStudentAttendsOneOf(
            U_OF_C_WOODLAWN_GENERAL_EDUCATION_JOINT_ES_HS_PROGRAM
          ),
          size: LotteryStageSize.LARGE
        },
        SIBLING_LOTTERY_STAGE,
        PROXIMITY_LOTTERY_STAGE,
        GENERAL_LOTTERY_STAGE
      )
    },
    "bc314f72be86fc565247301f6d8f99b8": {
        "name": "",
        "desc": "Minimum percentile of 40 in both reading and math on NWEA MAP, minimum 2.8 GPA in 7th grade, and minimum attendance percentage of 92.",
        "programs": [
            "COLLINS HS - Scholars - Application"
        ],
      "fn": accept(ifHasGrades({
        nweaBoth: 40,
        gpa: 2.8,
        attendance: 92
      }))
    },
    "685beedfccfae8bdb0649c36f03dfd7a": {
        "name": "",
        "desc": "Students are randomly selected by computerized lottery. The lottery is conducted in the following order: students currently enrolled in Chalmers, Dvorak, Herzl, Johnson, or Morton Elementary Schools; general.",
        "programs": [
            "COLLINS HS - Scholars - Selection"
        ],
      "fn": lottery(
        {
          filter: ifStudentAttendsOneOf(
            CHALMERS_ES_PROGRAM, 
            DVORAK_ES_PROGRAM, 
            HERZL_ES_PROGRAM, 
            JOHNSON_ES_PROGRAM, 
            MORTON_ES_PROGRAM
          ),
          size: LotteryStageSize.LARGE
        },
        GENERAL_LOTTERY_STAGE
      )
    },
    "9a2a27708247d3b692481757756b5226": {
        "name": "",
        "desc": "General Education and 504 Plan students: Minimum combined percentile of 40 in both reading and math on NWEA MAP, minimum 2.0 GPA in 7th grade, and minimum attendance percentage of 80.  IEP/EL students have no eligibility requirements.",
        "programs": [
            "TEAM HS - General Education - Application"
        ],
      "fn": conditional(
        {
          filter: ifIEPorEL,
          fn: accept(everyone)
        },
        {
          filter: everyone,
          fn: accept(ifHasGrades({
            nweaCombined: 40,
            gpa: 2.0,
            attendance: 80
          }))
        }
      )
    },
    "8f880cad92a9a0dc49dd8d6ba4209b14": {
        "name": "",
        "desc": "Students are randomly selected by computerized lottery. The lottery is conducted in the following order: students with a 7th grade final GPA of 2.5 or higher, general.",
        "programs": [
            "TEAM HS - General Education - Selection"
        ],
      "fn": lottery(
        {
          filter: ifHasGrades({
            gpa: 2.5
          }),
          size: LotteryStageSize.LARGE
        },
        GENERAL_LOTTERY_STAGE
      )
    },
    "43cabfe5f36cbf1ccbb95a9962d90319": {
        "name": "",
        "desc": "Students enrolled in the Taft Academic Center or students who live within the school's attendance boundary can be admitted automatically. This program only accepts students who live within the school's attendance boundary or who attend the school's Academic Center.",
        "programs": [
            "TAFT HS - General Education - Selection"
        ],
      "fn": accept(
        either(
          ifInAttendBound, 
          ifStudentAttendsOneOf(TAFT_ACADEMIC_CENTER_PROGRAM)
        )
      )
    },
    "9fad1e147fb546e7a25d0fccba608035": {
        "name": "",
        "desc": "Students who are enrolled in the Morgan Park Academic Center and students who live within the school's attendance boundary can be admitted automatically.  Students who live outside of the school's attendance boundary are randomly selected by computerized lottery. The lottery is conducted in the following order: sibling, general.",
        "programs": [
            "MORGAN PARK HS - General Education - Selection"
        ],
      "fn": conditional(
        {
          filter: ifStudentAttendsOneOf(MORGAN_PARK_ACADEMIC_CENTER_PROGRAM),
          fn: accept(everyone)
        },
        {
          filter: ifInAttendBound,
          fn: accept(everyone)
        },
        {
          filter: everyone,
          fn: lottery(
            SIBLING_LOTTERY_STAGE,
            GENERAL_LOTTERY_STAGE
          )
        }
      )
    },
    "7ef878b115498c24fd96f8891c346480": {
        "name": "",
        "desc": "General Education and 504 Plan students: Minimum percentile of 24 in both reading and math on NWEA MAP and minimum attendance percentage of 85.  IEP and EL students: Minimum combined percentile of 48 in reading and math on NWEA MAP, and minimum attendance percentage of 85.",
        "programs": [
            "WILLIAMS HS - General Education - Application"
        ],
      "fn": conditional(
        {
          filter: ifIEPorEL,
          fn: accept(ifHasGrades({
            nweaCombined: 48,
            attendance: 85
          }))
        },
        {
          filter: everyone,
          fn: accept(ifHasGrades({
            nweaBoth: 24,
            attendance: 85
          }))
        }
      )
    },
    "01bb8009b315ff8fc0120dbadf71444c": {
        "name": "",
        "desc": "General Education and 504 Plan students: Minimum percentile of 24 in both reading on math on NWEA MAP, minimum 2.5 GPA in 7th grade, and minimum attendance percentage of 90.  IEP and EL students: Minimum combined percentile of 48 in reading and math on NWEA MAP, minimum 2.5 GPA in 7th grade, and minimum attendance percentage of 90.",
        "programs": [
            "HUBBARD HS - University Scholars - Application"
        ],
      "fn": conditional(
        {
          filter: ifIEPorEL,
          fn: accept(ifHasGrades({
            nweaCombined: 48,
            gpa: 2.5,
            attendance: 90
          }))
        },
        {
          filter: everyone,
          fn: accept(ifHasGrades({
            nweaBoth: 24,
            gpa: 2.5,
            attendance: 90
          }))
        }
      )
    },
    "86b8c5719b264aa9072aa6433644fb60": {
        "name": "",
        "desc": "General Education and 504 Plan students: Minimum percentile of 24 in both reading and math on NWEA MAP, minimum 2.5 GPA in 7th grade, and minimum attendance percentage of 90.  IEP and EL students: Minimum combined percentile of 48 in reading and math on NWEA MAP, and minimum attendance percentage of 90.",
        "programs": [
            "SENN HS - Digital Journalism - Application"
        ],
      "fn": conditional(
        {
          filter: ifIEPorEL,
          fn: accept(ifHasGrades({
            nweaCombined: 48,
            attendance: 90
          }))
        },
        {
          filter: everyone,
          fn: accept(ifHasGrades({
            nweaBoth: 24,
            gpa: 2.5,
            attendance: 90
          }))
        }
      )
    },
    "87bdb6caf5cf899ddb8041511761e58b": {
        "name": "",
        "desc": "Students are randomly selected by computerized lottery. The lottery is conducted in the following order: sibling, general.",
        "programs": [
            "INTRINSIC HS - General Education - Selection",
            "YOUNG WOMENS HS - General Education - Selection",
            "INSTITUTO - HEALTH - General Education - Selection"
        ],
      "fn": lottery(
        SIBLING_LOTTERY_STAGE,
        GENERAL_LOTTERY_STAGE
      )
    },
    "23e3199eb5514de5456653457f75f366": {
        "name": "",
        "desc": "Minimum percentile of 60 in both reading and math on NWEA MAP, minimum 3.0 GPA in 7th grade, and minimum attendance percentage of 95.",
        "programs": [
            "KENWOOD HS - Magnet Program - Application"
        ],
      "fn": accept(ifHasGrades({
        nweaBoth: 60,
        gpa: 3.0,
        attendance: 95
      }))
    },
    "9b26cbed99b12a4c7cfca5a4713c6e17": {
        "name": "",
        "desc": "Students are randomly selected by computerized lottery. The lottery is conducted in the following order: students currently enrolled in the Kenwood Academic Center, general.",
        "programs": [
            "KENWOOD HS - Magnet Program - Selection"
        ],
      "fn": lottery(
        {
          filter: ifStudentAttendsOneOf(KENWOOD_ACADEMIC_CENTER_PROGRAM),
          size: LotteryStageSize.SMALL
        },
        GENERAL_LOTTERY_STAGE
      )
    },
    "0df5dab7dc2c1e8d8947d27287872269": {
        "name": "",
        "desc": "Students are selected on an overall applicant score. Points are based on NWEA MAP scores and 7th grade GPA. Students who live within the school's attendance boundary will be given 50 additional points. The school determines the minimum cutoff score for selections. Preference is given to students who meet the minimum eligibilty requirements, attend an Information Session, and are enrolled in the school\u2019s Middle Years Programme partner, Edwards Elementary School.",
        "programs": [
            "CURIE HS - International Baccalaureate (IB) - Selection"
        ],
      "fn": ibPointSystem
    },
    "9e837f0a671ce67593e611ccf595306a": {
        "name": "",
        "desc": "Students who live within the school's attendance boundary can be admitted automatically.  Students who live outside of the schools attendance boundary are randomly selected by computerized lottery. The lottery is conducted in the following order: sibling, general.",
        "programs": [
            "CORLISS HS - Early College STEM - Selection"
        ],
      "fn": conditional(
        {
          filter: ifInAttendBound,
          fn: accept(everyone)
        },
        {
          filter: everyone,
          fn: lottery(
            SIBLING_LOTTERY_STAGE,
            GENERAL_LOTTERY_STAGE
          )
        }
      )
    },
    "2fdf00001de412f0e493fa242647bad0": {
        "name": "",
        "desc": "Students are selected on an overall applicant score. Points are based on NWEA MAP scores and 7th grade GPA. Students who live within the school's attendance boundary will be given 50 additional points. The school determines the minimum cutoff score for selections. Preference is given to students who meet the minimum eligibility requirements, attend an Information Session, and are enrolled in the school\u2019s Academic Center.",
        "programs": [
            "TAFT HS - International Baccalaureate (IB) - Selection"
        ],
      "fn": ibPointSystem
    },
    "ba2bb65c77d8d0932634f43bb01707cc": {
        "name": "",
        "desc": "Students who live within the school's attendance area can be admitted automatically.  Students who live outside of the school's attendance boundary are randomly selected by computerized lottery. The lottery is conducted in the following order: students currently enrolled in Carnegie Elementary School, sibling, general.",
        "programs": [
            "HYDE PARK HS - General Education - Selection"
        ],
      "fn": conditional(
        {
          filter: ifInAttendBound,
          fn: accept(everyone)
        },
        {
          filter: everyone,
          fn: lottery(
            {
              filter: ifStudentAttendsOneOf(CARNEGIE_ES_PROGRAMS),
              size: LotteryStageSize.LARGE
            },
            SIBLING_LOTTERY_STAGE,
            GENERAL_LOTTERY_STAGE
          )
        }
      )
    },
    "08ee4f1aa31d5eb00bbc81c21139188b": {
        "name": "",
        "desc": "Students who live within the school's attendance boundary: None  Students who live outside of the school's attendance boundary: Minimum percentile of 60 in both reading and math on NWEA MAP and minimum 2.75 GPA in 7th grade. An audition is required for students who live outside of the school's attendance boundary.",
        "programs": [
            "LINCOLN PARK HS - Instrumental Music - Application"
        ],
      "fn": conditional(
        {
          filter: ifInAttendBound,
          fn: accept(everyone)
        },
        {
          filter: everyone,
          fn: accept(ifHasGrades({
            nweaBoth: 60,
            gpa: 2.75
          }))
        }
      )
    },
    "d1b719a6ff9e6979e8f14b2c05b63352": {
        "name": "",
        "desc": "Students are randomly selected by computerized lottery. The lottery is conducted in the following order: Alcott Elementary School students, proximity, general.",
        "programs": [
            "ALCOTT HS - General Education - Selection"
        ],
      "fn": lottery(
        {
          filter: ifStudentAttendsOneOf(ALCOTT_ES_PROGRAM),
          size: LotteryStageSize.LARGE
        },
        SIBLING_LOTTERY_STAGE,
        PROXIMITY_LOTTERY_STAGE,
        GENERAL_LOTTERY_STAGE
      )
    },
    "f5ef0c0580eb110a06888b1c15313717": {
        "name": "",
        "desc": "Minimum percentile of 60 in both reading and math on NWEA MAP and minimum 2.75 GPA in 7th grade. An audition is required for all eligible applicants.",
        "programs": [
            "LINCOLN PARK HS - Drama - Application"
        ],
      "fn": accept(ifHasGrades({
        nweaBoth: 60,
        gpa: 2.5
      }))
    },
    "9f4eb5cee59306847a4fa61720f8e54d": {
        "name": "",
        "desc": "Students are selected on a point system. Points are based on the student's NWEA MAP scores in reading and math, 7th grade GPA, and the audition.",
        "programs": [
            "LINCOLN PARK HS - Drama - Selection"
        ],
      "fn": notImplemented
    },
    "625d1f6025c2e892f5573e60ab69f903": {
        "name": "",
        "desc": "General Education and 504 Plan students: Minimum percentile of 24 in both reading and math on the NWEA MAP.  IEP and EL students: Minimum combined percentile of 48 in reading and math on NWEA MAP.",
        "programs": [
            "HARLAN HS - Pre-Engineering - Application"
        ],
      "fn": conditional(
        {
          filter: ifIEPorEL,
          fn: accept(ifHasGrades({
            nweaCombined: 48
          }))
        },
        {
          filter: everyone,
          fn: accept(ifHasGrades({
            nweaBoth: 24
          }))
        }
      )
    },
    "bc517a96ab40c67deddde65b6a4c07a8": {
        "name": "",
        "desc": "General Education and 504 Plan students: Minimum percentile of 24 in both reading and math on NWEA MAP.  IEP and EL students: Minimum combined percentile of 48 in reading and math on NWEA MAP.  A portfolio review is required for all eligible applicants.",
        "programs": [
            "SENN HS - Visual Arts - Application"
        ],
      "fn": conditional(
        {
          filter: ifIEPorEL,
          fn: accept(ifHasGrades({
            nweaCombined: 48
          }))
        },
        {
          filter: everyone,
          fn: accept(ifHasGrades({
            nweaBoth: 24
          }))
        }
      )
    },
    "cb76bc6620a1921e5f9630e2a39fb8d8": {
        "name": "",
        "desc": "Students are selected on a point system. Points are based on the student's NWEA MAP scores in reading and math, 7th grade final (cumulative) grades, and the portfolio review.",
        "programs": [
            "SENN HS - Visual Arts - Selection"
        ],
      "fn": notImplemented
    },
    "afb0dfcaa0f2cc236b2bd07a0244385e": {
        "name": "",
        "desc": "Students who live within the school's attendance boundary or who attend Grow Community Schools can be admitted automatically. This program only accepts students who live within the school's attendance boundary or attend a Grow Community School.",
        "programs": [
            "AMUNDSEN HS - General Education - Selection"
        ],
      "fn": accept(
        either(
          ifInAttendBound,
          ifStudentAttendsOneOf(...GROW_COMMUNITY_SCHOOL_ES_PROGRAMS)
        )
      )
    },
    "78e3973b67c80b7984271b2a127e9ebf": {
        "name": "",
        "desc": "Students who live within the school's attendance boundary have no eligibility requirements.  Students who live outside of the school's attendance boundary: Minimum 2.5 GPA in 7th grade and minimum attendance percentage of 85.",
        "programs": [
            "KELVYN PARK HS - General Education - Application"
        ],
      "fn": conditional(
        {
          filter: ifInAttendBound,
          fn: accept(everyone)
        },
        {
          filter: everyone,
          fn: accept(ifHasGrades({
            gpa: 2.5,
            attendance: 85
          }))
        }
      )
    },
    "03c4df08f6e417f196f6e87415e2064f": {
        "name": "",
        "desc": "Students who live within the school's attendance boundary have no eligibility requirements and can be admitted automatically.  Eligible students who live outside of the school's attendance boundary are selected on a point system. Points are based on NWEA MAP scores, 7th grade GPA, and the interview.",
        "programs": [
            "KELVYN PARK HS - General Education - Selection"
        ],
        "fn": conditional(
          {
            filter: ifInAttendBound,
            fn: accept(everyone)
          },
          {
            filter: everyone,
            fn: notImplemented
          }
        )
    },
    "95025d14a97b9b32f5a2c8225c4ddd6e": {
        "name": "",
        "desc": "General Education and 504 Plan students: Minimum percentile of 24 in both reading and math on NWEA MAP and minimum 2.5 GPA in 7th grade.  IEP and EL students: Minimum combined percentile of 48 in reading and math on NWEA MAP and minimum 2.5 GPA in 7th grade.  Attendance is required at an Information Session for all eliglble applicants.",
        "programs": [
            "HUBBARD HS - International Baccalaureate (IB) - Application"
        ],
        "fn": ibPointSystem
    },
    "296d2849362aa5311f457ffc834a868b": {
        "name": "",
        "desc": "Students are selected on a point system. Students are assigned points for 7th grade final GPA and 7th grade stanines. Students are ranked and selected from high to low. Students residing within the attendance overlay boundary of the school are selected first.",
        "programs": [
            "JONES HS - Pre-Law - Selection"
        ],
        "fn": notImplemented
    },
    "bb9e0e6f1af678dafb340a8e48ff4fbf": {
        "name": "",
        "desc": "Minimum percentile of 50 in both reading and math on NWEA MAP and minimum 3.0 GPA in 7th grade.",
        "programs": [
            "CHICAGO AGRICULTURE HS - Honors - Application"
        ],
        "fn": accept(ifHasGrades({
          nweaBoth: 50,
          gpa: 3.0
        }))
    },
    "26f5b02fa29f8a9c2b5bc909b844e585": {
        "name": "",
        "desc": "Students are selected on an overall applicant score. Points are based on NWEA MAP scores and 7th grade GPA. Students who live within the school's attendance boundary will be given 50 additional points. The school determines the minimum cutoff score for selections. Preference is given to students who meet the minimum eligibility requirements, attend an Information Session, and are enrolled in the school\u2019s Middle Years Programme partner,  Madero Middle School.",
        "programs": [
            "FARRAGUT HS - International Baccalaureate (IB) - Selection"
        ],
        "fn": ibPointSystem
    },
    "6de001ff1207c6d38de87e65f3e11ff3": {
        "name": "",
        "desc": "Students are randomly selected by computerized lottery. The lottery is conducted in the following order: students currently enrolled at Chicago Collegiate Charter School, sibling, proximity, general.",
        "programs": [
            "CHICAGO COLLEGIATE - General Education - Selection"
        ],
        "fn": lottery(
          {
            filter: ifStudentAttendsOneOf(CHICAGO_VIRTUAL_GENERAL_EDUCATION_JOINT_ES_HS_PROGRAM),
            size: LotteryStageSize.LARGE
          },
          SIBLING_LOTTERY_STAGE,
          PROXIMITY_LOTTERY_STAGE,
          GENERAL_LOTTERY_STAGE
        )
    },
    "351d1f100c07b40673b51f4506b0e34e": {
        "name": "",
        "desc": "None. All interested students, including students who live within the overlay boundary of the school, must submit apply.",
        "programs": [
            "BACK OF THE YARDS HS - General Education - Application"
        ],
        "fn": accept(everyone)
    },
    "fd100fd06ddf9bd72e2809f6d659faf2": {
        "name": "",
        "desc": "Students are randomly selected by computerized lottery. The lottery is conducted in the following order: students who live within the attendance boundaries of Chavez, Daley, Hamline, Hedges, Lara, or Seward Elementary Schools; general.",
        "programs": [
            "BACK OF THE YARDS HS - General Education - Selection"
        ],
        // TODO find attendance bound geometries for these schools
        "fn": lottery(
          GENERAL_LOTTERY_STAGE
        )
    },
    "763686fddcad223e9a51aebaac42b61c": {
        "name": "",
        "desc": "Students who live within the school's attendance boundary have no eligibility requirements.  Students who live outside of the school's attendance boundary: General Education and 504 Plan students: Minimum percentile of 60 in both reading and math on NWEA MAP, minimum 3.0 GPA in 7th grade, and minimum attendance percentage of 95.  IEP/EL students have no eligibility requirements.",
        "programs": [
            "WELLS HS - General Education - Application"
        ],
        "fn": conditional(
          {
            filter: ifInAttendBound,
            fn: accept(everyone)
          },
          {
            filter: ifIEPorEL,
            fn: accept(everyone)
          },
          {
            filter: everyone,
            fn: accept(ifHasGrades({
              nweaBoth: 60,
              gpa: 3.0,
              attendance: 95
            }))
          }
        )
    },
    "379139122b47f0c7efa0e423df956e30": {
        "name": "",
        "desc": "Students who live within the school's attendance boundary have no eligibility requirements and can be admitted automatically.  Eligible students who live outside of the school's attendance boundary are randomly selected by computerized lottery. The lottery is conducted in the following order: students scoring above designated NWEA MAP percentile, sibling, general.",
        "programs": [
            "WELLS HS - General Education - Selection"
        ],
        "fn": conditional(
          {
            filter: ifInAttendBound,
            fn: accept(everyone)
          },
          {
            filter: everyone,
            fn: lottery(
              {
                filter: ifHasGrades({
                  nweaBoth: 60
                }),
                size:LotteryStageSize.LARGE
              },
              SIBLING_LOTTERY_STAGE,
              GENERAL_LOTTERY_STAGE
            )
          }
        )
    },
    "69aef50164a2914f16a28630afa50270": {
        "name": "",
        "desc": "General Education and 504 Plan students: Minimum percentile of 30 in both reading and math on NWEA MAP, minimum 2.0 GPA in 7th grade and minimum attendance percentage of 85.  IEP and EL students: Minimum combined percentile of 24 in reading and math on NWEA MAP, and minimum attendance percentage of 85.",
        "programs": [
            "COLLINS HS - General Education - Application"
        ],
        "fn": conditional(
          {
            filter: ifIEPorEL,
            fn: accept(ifHasGrades({
              nweaCombined: 24,
              attendance: 85
            }))
          },
          {
            filter: everyone,
            fn: accept(ifHasGrades({
              nweaBoth: 30,
              gpa: 2.0,
              attendance: 85
            }))
          }
        )
    },
    "a105512ab5a0eb6536021215baf98ea8": {
        "name": "",
        "desc": "Students are randomly selected by computerized lottery. The lottery is conducted in the following order: students currently enrolled in Chalmers, Dvorak, Herzl, Johnson, or Morton Elementary Schools; sibling; general.",
        "programs": [
            "COLLINS HS - General Education - Selection"
        ],
        "fn": lottery(
          {
            filter: ifStudentAttendsOneOf(
              CHALMERS_ES_PROGRAM, 
              DVORAK_ES_PROGRAM,
              HERZL_ES_PROGRAM,
              JOHNSON_ES_PROGRAM,
              MORTON_ES_PROGRAM
            ),
            size: LotteryStageSize.LARGE
          },
          SIBLING_LOTTERY_STAGE,
          GENERAL_LOTTERY_STAGE
        )
    },
    "47750c8ffb643412fb55f3f3d6bde14a": {
        "name": "",
        "desc": "Students are selected on an overall applicant score. Points are based on NWEA MAP scores and 7th grade GPA. Students who live within the school's attendance boundary will be given 50 additional points. The school selects the minimum cutoff score for selections. Preference is given to students who meet the minimum eligibility requirements, attend an Information Session, and are enrolled in the school\u2019s Middle Years Programme partner, Ogden Elementary School.",
        "programs": [
            "OGDEN HS - International Baccalaureate (IB) - Selection"
        ],
        "fn": ibPointSystem
    },
    "a6071a83f74612d54c3f659f9cb8a79c": {
        "name": "",
        "desc": "General Education/504 Plan students: Minimum percentile of 24 in both reading and math on NWEA MAP and minimum 2.5 GPA in 7th grade.  IEP and EL students: Minimum combined percentile of 48 in reading and math on NWEA MAP and minimum 2.5 GPA in 7th grade.  Attendance at an Information Session is required for all eligible applicants.",
        "programs": [
            "SENN HS - International Baccalaureate (IB) - Application"
        ],
        "fn": conditional(
          {
            filter: ifIEPorEL,
            fn: accept(ifHasGrades({
              nweaCombined: 48,
              gpa: 2.5
            }))
          },
          {
            filter: everyone,
            fn: accept(ifHasGrades({
              nweaBoth: 24,
              gpa: 2.5
            }))
          }
        )
    },
    "8605454896638a4de5feec75ed536489": {
        "name": "",
        "desc": "Students are selected on an overall applicant score. Points are based on NWEA MAP scores and 7th grade GPA. Students who live within the school's attendance boundary will be given 50 additional points. The school determines the minimum cutoff score for selections. Preference is given to students who meet the minimum eligibility requirements, attend an Information Session, and are enrolled in the school\u2019s Middle Years Programme partner, Peirce Elementary School.",
        "programs": [
            "SENN HS - International Baccalaureate (IB) - Selection"
        ],
        "fn": ibPointSystem
    },
    "5e32e9c5ce34b2af75f2ec9e1a6c6643": {
        "name": "",
        "desc": "General Education and 504 Plan students: Minimum percentile of 50 in both reading and math on NWEA MAP, minimum 2.5 GPA in 7th grade.    IEP and EL students: Minimum combined percentile of 100 in reading and math on NWEA MAP and minimum 2.5 GPA in 7th grade.",
        "programs": [
            "BRONZEVILLE HS - Honors - Application"
        ],
        "fn": conditional(
          {
            filter: ifIEPorEL,
            fn: accept(ifHasGrades({
              nweaCombined: 100,
              gpa: 2.5
            }))
          },
          {
            filter: everyone,
            fn: accept(ifHasGrades({
              nweaBoth: 50,
              gpa: 2.5
            }))
          }
        )
    },
    "8a0c487746fe132f3f1925a84c56e9ee": {
        "name": "",
        "desc": "General Education and 504 Plan students: Minimum percentile of 24 in both reading and math on NWEA MAP and minimum 2.5 GPA in 7th grade.  IEP and EL students: Minimum combined percentile of 48 in reading and math on NWEA MAP and minimum 2.5 GPA in 7th grade.  Attendance at an Information Session is required for all eliglble applicants.",
        "programs": [
            "LINCOLN PARK HS - International Baccalaureate (IB) - Application"
        ],
        "fn": conditional(
          {
            filter: ifIEPorEL,
            fn: accept(ifHasGrades({
              nweaCombined: 48,
              gpa: 2.5
            }))
          },
          {
            filter: everyone,
            fn: accept(ifHasGrades({
              nweaBoth: 24,
              gpa: 2.5
            }))
          }
        )

    },
    "8e60c325cf7da2ae7aa09dc4e543590e": {
        "name": "",
        "desc": "Students are selected based on an overall applicant score. Points are based on NWEA MAP scores and 7th grade GPA. Students who live within the school's attendance boundary will be given 50 additional points. The school selects the minimum cutoff score for selections.",
        "programs": [
            "LINCOLN PARK HS - International Baccalaureate (IB) - Selection"
        ],
        "fn": ibPointSystem
    },
    "f1650d13a99b142887259980d7570270": {
        "name": "",
        "desc": "Students are selected on an overall applicant score. Points are based on NWEA MAP scores and 7th grade GPA. Students who live within the school's attendance boundary will be given 50 additional points. The school determines the minimum cutoff score for selections.  Preference is given to students who meet the minimum eligibility requirements, attend an Information Session, and are enrolled in the school\u2019s Middle Years Programme partner, McPherson Elementary School.",
        "programs": [
            "AMUNDSEN HS - International Baccalaureate (IB) - Selection"
        ],
        "fn": ibPointSystem
    },
    "2434179e9c2fb95777cc4e0c6c998de1": {
        "name": "",
        "desc": "Students who live within the school's attendance boundary have no eligibility requirements.  Students who live outside of the school's attendance boundary: Minimum attendance percentage of 95.",
        "programs": [
            "WORLD LANGUAGE HS - General Education - Application"
        ],
        "fn": conditional(
          {
            filter: ifInAttendBound,
            fn: accept(everyone)
          },
          {
            filter: everyone,
            fn: accept(ifHasGrades({
              attendance: 95
            }))
          }
        )
    },
    "cbc3d549cb9e0240f077ac3c87b0f671": {
        "name": "",
        "desc": "Students who live within the school's attendance boundary have no eligibility requirements and can be admitted automatically.  Eligible students who live outside of the school's attendance boundary are randomly selected by computerized lottery.\u00a0The lottery is conducted in the following order: sibling, general.",
        "programs": [
            "WORLD LANGUAGE HS - General Education - Selection"
        ],
        "fn": conditional(
          {
            filter: ifInAttendBound,
            fn: accept(everyone)
          },
          {
            filter: everyone,
            fn: lottery(
              SIBLING_LOTTERY_STAGE,
              GENERAL_LOTTERY_STAGE
            )
          }
        )
    },
    "5cfeec40267082ca1ee0ca7e469687a7": {
        "name": "",
        "desc": "Contact the school for information.",
        "programs": [
            "LAKE VIEW HS - Early College STEM - Selection"
        ],
        "fn": notImplemented
    },
    "94798381edc76846cfb1ec3503fd61b0": {
        "name": "",
        "desc": "Students who live within the school's attendance boundary have no eligibility requirements.  Students who live outside of the school's attendance boundary: Essay",
        "programs": [
            "SOCIAL JUSTICE HS - General Education - Application"
        ],
        "fn": accept(everyone)
    },
    "62c57f6f0d8cb1d35fb12bd66840819f": {
        "name": "",
        "desc": "Students who live within the school's attendance boundary have no eligibility requirements and can be admitted automatically.  Students who live outside of the school's attendance boundary are selected on a point system. The points are based on the student essay and NWEA MAP scores.",
        "programs": [
            "SOCIAL JUSTICE HS - General Education - Selection"
        ],
        "fn": conditional(
          {
            filter: ifInAttendBound,
            fn: accept(everyone)
          },
          {
            filter: everyone,
            fn: notImplemented
          }
        )
    },
    "182b0f39bdb6558622d86addc2aae6b7": {
        "name": "",
        "desc": "Students are selected on an overall applicant score. Points are based on NWEA MAP scores and 7th grade GPA. Students who live within the school's attendance boundary will be given 50 additional points. The school determines the minimum cutoff score for selections.  Preference is given to students who meet the minimum eligibilty requirements, attend an Information Session, and are enrolled in the school\u2019s Middle Years Programme partner, Carnegie Elementary School.",
        "programs": [
            "HYDE PARK HS - International Baccalaureate (IB) - Selection"
        ],
        "fn": ibPointSystem
    },
    "c7ce3086f4acc55ea53e0c97f71d12aa": {
        "name": "",
        "desc": "Students who live within the school's attendance boundary and students currently enrolled in the Kenwood Academic Center can be admitted automatically. This program only accepts students who live within the school's attendance boundary or who are enrolled in the school's Academic Center.",
        "programs": [
            "KENWOOD HS - General Education - Selection"
        ],
        "fn": accept(either(
          ifInAttendBound,
          ifStudentAttendsOneOf(KENWOOD_ACADEMIC_CENTER_PROGRAM)
        ))
    },
    "65f9f712e101af2ba0f44401e01ca729": {
        "name": "",
        "desc": "Students are selected on a point system. Points are based on 7th grade final GPA and NWEA MAP scores. The school determines the minimum cutoff score for selections. Preference is given to students who live within the school's attendance boundary.",
        "programs": [
            "AUSTIN CCA HS - Pre-Engineering - Selection"
        ],
        "fn": notImplemented
    },
    "5fbf1b80166fef3a0e0db9557d500465": {
        "name": "",
        "desc": "General Education and 504 Plan students: Minimum percentile of 25 in both reading and math on NWEA MAP.   IEP and EL students: Minimum combined percentile of 50 in reading and math on NWEA MAP, and minimum attendance percentage of 85.",
        "programs": [
            "CHICAGO ACADEMY HS - General Education - Application"
        ],
        "fn": conditional(
          {
            filter: ifIEPorEL,
            fn: accept(ifHasGrades({
              nweaCombined: 50,
              attendance: 85
            }))
          },
          {
            filter: everyone,
            fn: accept(ifHasGrades({
              nweaBoth: 25
            }))
          }
        )
    },
    "924ceb6aa82922cdb541302a265549eb": {
        "name": "",
        "desc": "Students who live within the school's attendance boundary can be admitted automatically.  Students who live outside of the school's attendance boundary are randomly selected by computerized lottery. The lottery is conducted in the following order: students attending Boone, Field, Gale, Hayt, Jordan, Kilmer, McCutcheon, McPherson, or West Ridge Elementary Schools; sibling; general.",
        "programs": [
            "SULLIVAN HS - General Education - Selection"
        ],
        "fn": conditional(
          {
            filter: ifInAttendBound,
            fn: accept(everyone)
          },
          {
            filter: everyone,
            fn: lottery(
              {
                filter: ifStudentAttendsOneOf(
                  BOONE_ES_PROGRAM,
                  FIELD_ES_PROGRAM,
                  GALE_ES_PROGRAM,
                  HAYT_ES_PROGRAM,
                  JORDAN_ES_PROGRAM,
                  KILMER_ES_PROGRAM,
                  MCCUTCHEON_ES_PROGRAM,
                  MCPHERSON_ES_PROGRAM,
                  WEST_RIDGE_ES_PROGRAM
                ),
                size: LotteryStageSize.LARGE
              },
              SIBLING_LOTTERY_STAGE,
              GENERAL_LOTTERY_STAGE
            )
          }
        )
    },
    "46083386e3daad02ff00ac73d3987286": {
        "name": "",
        "desc": "Students are selected on a point system with a maximum of 900 points. Points are based on 7th grade final grades, NWEA MAP scores, and the admissions test, each worth a maximum of 300 points.",
        "programs": [
            "PAYTON HS - Selective Enrollment High School - Selection"
        ],
        "fn": sePointSystem
    },
    "536556326f56a1875afccbeedde85fb9": {
        "name": "",
        "desc": "Students are randomly selected by computerized lottery. The lottery is conduced in the following order: sibling, general.",
        "programs": [
            "LEGAL PREP HS - General Education - Selection"
        ],
        "fn": lottery(
          SIBLING_LOTTERY_STAGE,
          GENERAL_LOTTERY_STAGE
        )
    },
    "7cc8a6e9cd27c6a9e8d43b323a961475": {
        "name": "",
        "desc": "Applicants must be girls currently enrolled in eighth grade.",
        "programs": [
            "YOUNG WOMENS HS - General Education - Application"
        ],
        // TODO handle gender?
        "fn": accept(everyone)   
    },
    "a787cb9987ca94d3c2370e2cb67d50cc": {
        "name": "",
        "desc": "General Education and 504 Plan students: Minimum percentile of 50 in both reading and math on the NWEA MAP and minimum 3.0 GPA in 7th grade.  IEP and EL students: Minimum combined percentile of 60 in reading and math on NWEA MAP.",
        "programs": [
            "MORGAN PARK HS - World Language and International Studies - Application"
        ],
        "fn": conditional(
          {
            filter: ifIEPorEL,
            fn: accept(ifHasGrades({
              nweaCombined: 60
            }))
          },
          {
            filter: everyone,
            fn: accept(ifHasGrades({
              nweaBoth: 50,
              gpa: 3.0
            }))
          }
        )
    },
    "d7e3e54b06028c21a40cf58127e2aef4": {
        "name": "",
        "desc": "Minimum percentile of 60 in both reading and math on NWEA MAP and minimum 3.0 GPA in 7th grade. Eligible students must submit teacher recommendations and an essay. See www.vonsteuben.org for submission details (click 'Apply' and 'Scholars Program'). Applicants who are not eligible will automatically be included in the computerized lottery selection process for the Von Steuben Science Program.",
        "programs": [
            "VON STEUBEN HS - Scholars - Application"
        ],
        "fn": accept(ifHasGrades({
          nweaBoth: 60,
          gpa: 3.0
        }))
    },
    "0a7d20d2cdbb736d46e6c7a37e5b7764": {
        "name": "",
        "desc": "Students are selected on a point system. Points are based on the teacher recommendations and the essay.",
        "programs": [
            "VON STEUBEN HS - Scholars - Selection"
        ],
        "fn": notImplemented
    },
    "a59652b1328b73b5acb08979a32a9db8": {
        "name": "",
        "desc": "General Education and 504 Plan students: Minimum percentile of 24 in both reading and math on NWEA MAP and minimum attendance percentage of 92.  IEP and EL students: Minimum combined percentile of 48 in reading and math on NWEA MAP and minimum attendance percentage of 92.  An audition is required for all eligible applicants.",
        "programs": [
            "CHIARTS HS - Music - Vocal - Application",
            "CHIARTS HS - Theatre - Application",
            "CHIARTS HS - Music - Instumental - Application",
            "CHIARTS HS - Dance - Application"
        ],
        "fn": conditional(
          {
            filter: ifIEPorEL,
            fn: accept(ifHasGrades({
              nweaCombined: 48,
              attendance: 92
            }))
          },
          {
            filter: everyone,
            fn: accept(ifHasGrades({
              nweaBoth: 24,
              attendance: 92
            }))
          }
        )
    },
    "500cba9f742c1244ddaa1c37070299f1": {
        "name": "",
        "desc": "Students are selected on a point system. Points are based on the student's NWEA MAP scores in reading and math and the audition.",
        "programs": [
            "CHIARTS HS - Music - Vocal - Selection",
            "CHIARTS HS - Theatre - Selection",
            "CHIARTS HS - Music - Instumental - Selection",
            "CHIARTS HS - Dance - Selection",
            "CHIARTS HS - Musical Theatre - Selection"
        ],
        "fn": notImplemented
    },
    "b89ee63f6f32c43ca9707a85d8dc98e7": {
        "name": "",
        "desc": "General Education and 504 Plan students: Minimum percentile of 24 in both reading and math on NWEA MAP and minimum attendance percentage of 92.  IEP and EL students: Minimum combined percentile of 48 in reading and math on NWEA MAP and minimum attendance percentage of 92.   A portfolio review is required for all eligible applicants.",
        "programs": [
            "CHIARTS HS - Creative Writing - Application"
        ],
        "fn": conditional(
          {
            filter: ifIEPorEL,
            fn: accept(ifHasGrades({
              nweaCombined: 48,
              attendance: 92
            }))
          },
          {
            filter: everyone,
            fn: accept(ifHasGrades({
              nweaBoth: 24,
              attendance: 92
            }))
          }
        )
    },
    "fd2b72f8025478fc320959b283c0ff2f": {
        "name": "",
        "desc": "Students are selected on a point system. Points are based on the student's NWEA MAP scores in reading and math and the portfolio review.",
        "programs": [
            "CHIARTS HS - Creative Writing - Selection"
        ],
        "fn": notImplemented
    },
    "3f45862ca2003745fc3f4e12492abdfa": {
        "name": "",
        "desc": "General Education and 504 Plan students: Minimum percentile of 24 in both reading and math on NWEA MAP and minimum attendance percentage of 92.  IEP and EL students: Minimum combined percentile of 48 in reading and math on NWEA MAP.  A portfolio review is required for all eligible applicants.",
        "programs": [
            "CHIARTS HS - Visual Arts - Application"
        ],
        "fn": conditional(
          {
            filter: ifIEPorEL,
            fn: accept(ifHasGrades({
              nweaCombined: 48
            }))
          },
          {
            filter: everyone,
            fn: accept(ifHasGrades({
              nweaBoth: 24,
              attendance: 92
            }))
          }
        )
    },
    "6c2d1016a23c9b0e67736b91a166b594": {
        "name": "",
        "desc": "Students are selected on a point system. Points are based on the student's NWEA MAP socres in reading and math and the portfolio review.",
        "programs": [
            "CHIARTS HS - Visual Arts - Selection"
        ],
        "fn": notImplemented
    },
    "ae43e969113d1c6b1b6fe0c0a1321c40": {
        "name": "",
        "desc": "General Education and 504 Plan students: Minimum percentile of 24 in both reading and math on NWEA MAP and minimum attendance percentage of 92.  IEP and EL students: Minimum combined percentile of 48 in reading and math on NWEA MAP and minimum attendance percentage of 92. An audition is required for all eligible applicants.",
        "programs": [
            "CHIARTS HS - Musical Theatre - Application"
        ],
        "fn": conditional(
          {
            filter: ifIEPorEL,
            fn: accept(ifHasGrades({
              nweaCombined: 48,
              attendance: 92
            }))
          },
          {
            filter: everyone,
            fn: accept(ifHasGrades({
              nweaBoth: 24,
              attendance: 92
            }))
          }
        )
    },
  "879a7018afe10fdba3bb57e12bdc8449": {
    "id": "879a7018afe10fdba3bb57e12bdc8449",
    "programs": [
      "ASPIRA - EARLY COLLEGE HS: General Education",
      "ASPIRA - BUSINESS & FINANCE HS: General Education"
    ],
    "desc": "Students are randomly selected by computerized lottery. The lottery is conducted in the following order: students who are currently enrolled in Aspira Haugan Middle School; sibling; general.",
    "fn": lottery(
      {
        filter: ifStudentAttendsOneOf(ASPIRA_MS_PROGRAM),
        size: LotteryStageSize.LARGE
      },
      SIBLING_LOTTERY_STAGE,
      GENERAL_LOTTERY_STAGE
    )
  },
  "011c3cb647a3dc135766a422727ee42d": {
    "id": "011c3cb647a3dc135766a422727ee42d",
    "programs": [
      "CHIARTS HS: Creative Writing"
    ],
    "desc": "General Education and 504 Plan students: Minimum percentile of 24 in both reading and math on NWEA MAP and 7th grade minimum attendance percentage of 92.IEP and EL students: Minimum combined percentile of 48 in reading and math on NWEA MAP and 7th grade minimum attendance percentage of 92. A portfolio review is required for all eligible applicants.Students who are not eligible should visit http://chiarts.org/prospective-students-parents/apply/academic-meetings to request a meeting to discuss their academic record and a possible change in their eligibility status.",
        "fn": conditional(
          {
            filter: ifIEPorEL,
            fn: accept(ifHasGrades({
              nweaCombined: 48,
              attendance: 92
            }))
          },
          {
            filter: everyone,
            fn: accept(ifHasGrades({
              nweaBoth: 24,
              attendance: 92
            }))
          }
        )
  },
  "fd82c251d380376e674f664267be6abf": {
    "id": "fd82c251d380376e674f664267be6abf",
    "programs": [
      "CHIARTS HS: Creative Writing"
    ],
    "desc": "Eligible students are selected on a point system. Points are based on the student's NWEA MAP scores in reading and math and the portfolio review.",
    "fn": notImplemented
  },
  "5fc31b28b79cd1c3b9003ae1e5f156f1": {
    "id": "5fc31b28b79cd1c3b9003ae1e5f156f1",
    "programs": [
      "CHIARTS HS: Dance",
      "CHIARTS HS: Music - Vocal",
      "CHIARTS HS: Theatre"
    ],
    "desc": "General Education and 504 Plan students: Minimum percentile of 24 in both reading and math on NWEA MAP and 7th grade minimum attendance percentage of 92.IEP and EL students: Minimum combined percentile of 48 in reading and math on NWEA MAP and 7th grade minimum attendance percentage of 92.An audition is required for all eligible applicants.Students who are not eligible should visit http://chiarts.org/prospective-students-parents/apply/academic-meetings to request a meeting to discuss their academic record and a possible change in their eligibility status.",
        "fn": conditional(
          {
            filter: ifIEPorEL,
            fn: accept(ifHasGrades({
              nweaCombined: 48,
              attendance: 92
            }))
          },
          {
            filter: everyone,
            fn: accept(ifHasGrades({
              nweaBoth: 24,
              attendance: 92
            }))
          }
        )
  },
  "5e70c78c5752d2facd86a84ce8944df1": {
    "id": "5e70c78c5752d2facd86a84ce8944df1",
    "programs": [
      "CHIARTS HS: Dance",
      "CHIARTS HS: Music - Instrumental",
      "CHIARTS HS: Music - Vocal",
      "CHIARTS HS: Musical Theatre",
      "CHIARTS HS: Theatre"
    ],
    "desc": "Eligible students are selected on a point system. Points are based on the student's NWEA MAP scores in reading and math and the audition.",
    "fn": notImplemented
  },
  "7a5c6423970f56d8c99f8e86c924cd62": {
    "id": "7a5c6423970f56d8c99f8e86c924cd62",
    "programs": [
      "CHIARTS HS: Music - Instrumental"
    ],
    "desc": "General Education and 504 Plan students: Minimum percentile of 24 in both reading and math on NWEA MAP and 7th grade minimum attendance percentage of 92.IEP and EL students: Minimum combined percentile of 48 in reading and math on NWEA MAP and 7th grade minimum attendance percentage of 92.An audition is required for all eligible applicants.An audition is required for all eligible applicants.Students who are not eligible should visit http://chiarts.org/prospective-students-parents/apply/academic-meetings to request a meeting to discuss their academic record and a possible change in their eligibility status.",
        "fn": conditional(
          {
            filter: ifIEPorEL,
            fn: accept(ifHasGrades({
              nweaCombined: 48,
              attendance: 92
            }))
          },
          {
            filter: everyone,
            fn: accept(ifHasGrades({
              nweaBoth: 24,
              attendance: 92
            }))
          }
        )
  },
  "8c34c2c54badedb51bad182183dd3463": {
    "id": "8c34c2c54badedb51bad182183dd3463",
    "programs": [
      "CHIARTS HS: Musical Theatre"
    ],
    "desc": "General Education and 504 Plan students: Minimum percentile of 24 in both reading and math on NWEA MAP and 7th grade minimum attendance percentage of 92.IEP and EL students: Minimum combined percentile of 48 in reading and math on NWEA MAP and 7th grade minimum attendance percentage of 92. An audition is required for all eligible applicants.Students who are not eligible should visit http://chiarts.org/prospective-students-parents/apply/academic-meetings to request a meeting to discuss their academic record and a possible change in their eligibility status.",
        "fn": conditional(
          {
            filter: ifIEPorEL,
            fn: accept(ifHasGrades({
              nweaCombined: 48,
              attendance: 92
            }))
          },
          {
            filter: everyone,
            fn: accept(ifHasGrades({
              nweaBoth: 24,
              attendance: 92
            }))
          }
        )
  },
  "282d626abf1fb0be83f7dd32448845f8": {
    "id": "282d626abf1fb0be83f7dd32448845f8",
    "programs": [
      "CHIARTS HS: Visual Arts"
    ],
    "desc": "General Education and 504 Plan students: Minimum percentile of 24 in both reading and math on NWEA MAP and 7th grade minimum attendance percentage of 92.IEP and EL students: Minimum combined percentile of 48 in reading and math on NWEA MAP and 7th grade minimum attendance percentage of 92.A portfolio review is required for all eligible applicants.Students who are not eligible should visit http://chiarts.org/prospective-students-parents/apply/academic-meetings to request a meeting to discuss their academic record and a possible change in their eligibility status.",
        "fn": conditional(
          {
            filter: ifIEPorEL,
            fn: accept(ifHasGrades({
              nweaCombined: 48,
              attendance: 92
            }))
          },
          {
            filter: everyone,
            fn: accept(ifHasGrades({
              nweaBoth: 24,
              attendance: 92
            }))
          }
        )
  },
  "cd46366c37472a8dd1b0c40a9be42bb1": {
    "id": "cd46366c37472a8dd1b0c40a9be42bb1",
    "programs": [
      "CHIARTS HS: Visual Arts"
    ],
    "desc": "Eligible students are selected on a point system. Points are based on the student's NWEA MAP socres in reading and math and the portfolio review.",
    "fn": notImplemented
  },
  "1ce9e8c34ffd852aef20e2d7250cd2af": {
    "id": "1ce9e8c34ffd852aef20e2d7250cd2af",
    "programs": [
      "CICS - ELLISON HS: Science/Technology/Engineering/Math",
      "CICS - NORTHTOWN HS: General Education",
      "CICS - CHICAGOQUEST HS: General Education"
    ],
    "desc": "Students are randomly selected by computerized lottery. The lottery is conducted in the following order: students currently enrolled in one of the following CICS schools: Avalon, Basil, Bucktown, Irving Park, Longwood, Prairie, Washington Park, West Belden, or Wrightwood; sibling; general.",
      "fn": lottery(
        {
          filter: ifStudentAttendsOneOf(
            CICS_AVALON_ES_PROGRAM,
            CICS_BASIL_ES_PROGRAM,
            CICS_BUCKTOWN_ES_PROGRAM,
            CICS_IRVING_PARK_ES_PROGRAM,
            CICS_LONGWOOD_GENERAL_EDUCATION_JOINT_ES_HS_PROGRAM,
            CICS_PRAIRIE_ES_PROGRAM,
            CICS_WASHINGTON_PARK_ES_PROGRAM,
            CICS_WEST_BELDEN_ES_PROGRAM,
            CICS_WRIGHTWOOD_ES_PROGRAM
          ),
          size: LotteryStageSize.LARGE
        },
        SIBLING_LOTTERY_STAGE,
        GENERAL_LOTTERY_STAGE
      )
  },
  "5c1b9b7df462ceabb083e04789611249": {
    "id": "5c1b9b7df462ceabb083e04789611249",
    "programs": [
      "CICS - LONGWOOD: General Education"
    ],
    "desc": "Students currently enrolled in the school's eighth grade will have a deadline to submit their intent to enroll in ninth grade if they wish to remain at the school.Students who are not currently enrolled in the school are randomly selected by computerized lottery. The lottery is conducted in the following order: students currently enrolled in one of the following CICS schools: Avalon, Basil, Bucktown, Irving Park, Longwood, Prairie, Washington Park, West Belden, or Wrightwood; sibling; general.",
      "fn": lottery(
        {
          filter: ifStudentAttendsOneOf(
            CICS_AVALON_ES_PROGRAM,
            CICS_BASIL_ES_PROGRAM,
            CICS_BUCKTOWN_ES_PROGRAM,
            CICS_IRVING_PARK_ES_PROGRAM,
            CICS_LONGWOOD_GENERAL_EDUCATION_JOINT_ES_HS_PROGRAM,
            CICS_PRAIRIE_ES_PROGRAM,
            CICS_WASHINGTON_PARK_ES_PROGRAM,
            CICS_WEST_BELDEN_ES_PROGRAM,
            CICS_WRIGHTWOOD_ES_PROGRAM
          ),
          size: LotteryStageSize.LARGE
        },
        SIBLING_LOTTERY_STAGE,
        GENERAL_LOTTERY_STAGE
      )
  },
  "eca3ee8edf32130e0a41b2692891b469": {
    "id": "eca3ee8edf32130e0a41b2692891b469",
    "programs": [
      "CHICAGO MATH & SCIENCE HS: General Education",
      "PERSPECTIVES - JOSLIN HS: General Education",
      "PERSPECTIVES - MATH & SCI HS: STEM Initiative",
      "CHICAGO COLLEGIATE: General Education",
      "INTRINSIC HS: General Education",
      "FOUNDATIONS: General Education"
    ],
    "desc": "Students currently enrolled in the school's eighth grade will have a deadline to submit their intent to enroll in ninth grade if they wish to remain at the school.Students who are not currently enrolled in the school are randomly selected by computerized lottery. The lottery is conducted in the following order: sibling, general.",
    "fn": lottery(
      SIBLING_LOTTERY_STAGE,
      GENERAL_LOTTERY_STAGE
    )
  },
  "ddc1a6747122c3d29fc614eb7ec7fbb1": {
    "id": "ddc1a6747122c3d29fc614eb7ec7fbb1",
    "programs": [
      "NOBLE - COMER: General Education",
      "PERSPECTIVES - LEADERSHIP HS: General Education"
    ],
    "desc": "Students currently enrolled in the school's eighth grade will have a deadline to submit their intent to enroll in ninth grade if they wish to remain at the school.Students who are not currently enrolled in the school are randomly selected by computerized lottery. The lottery is conducted in the following order: sibling, proximity, general.",
    "fn": lottery(
      SIBLING_LOTTERY_STAGE,
      PROXIMITY_LOTTERY_STAGE,
      GENERAL_LOTTERY_STAGE
    )
  },
  "50ed4ff8ae4d625471c35f4fa0d51dea": {
    "id": "50ed4ff8ae4d625471c35f4fa0d51dea",
    "programs": [
      "U OF C - WOODLAWN HS: General Education"
    ],
    "desc": "Students are randomly selected by computerized lottery. The lottery is conducted in the following order: students currently enrolled in University of Chicago Woodlawn, sibling, proximity, general.",
    "fn": lottery(
      {
        filter: ifStudentAttendsOneOf(
          U_OF_C_WOODLAWN_GENERAL_EDUCATION_JOINT_ES_HS_PROGRAM, 
        ),
        size: LotteryStageSize.LARGE
      },
      SIBLING_LOTTERY_STAGE,
      PROXIMITY_LOTTERY_STAGE,
      GENERAL_LOTTERY_STAGE
    )
  },
  "93c44f16ea5e424e00449d018b357e4c": {
    "id": "93c44f16ea5e424e00449d018b357e4c",
    "programs": [
      "ACERO - GARCIA HS: General Education"
    ],
    "desc": "Students are randomly selected by computerized lottery. The lottery is conducted in the following order: students currently enrolled in 8th grade at an Acero Elementary Charter School, sibling, general.",
    "fn": lottery(
      {
        filter: ifStudentAttendsOneOf(ACERO_ES_PROGRAMS),
        size: LotteryStageSize.LARGE
      },
      SIBLING_LOTTERY_STAGE,
      GENERAL_LOTTERY_STAGE
    )
  },
  "274b68192b056e268f128ff63bfcd4a4": {
    "id": "274b68192b056e268f128ff63bfcd4a4",
    "programs": [
      "YCCS - SCHOLASTIC ACHIEVEMENT: General Education",
      "YCCS - SCHOLASTIC ACHIEVEMENT: General Education",
      "YCCS - MCKINLEY: General Education",
      "YCCS - MCKINLEY: General Education",
      "YCCS - ASPIRA PANTOJA: General Education",
      "YCCS - ASPIRA PANTOJA: General Education",
      "YCCS - ASSOCIATION HOUSE: General Education",
      "YCCS - ASSOCIATION HOUSE: General Education",
      "YCCS - AUSTIN CAREER: General Education",
      "YCCS - AUSTIN CAREER: General Education",
      "YCCS - CCA ACADEMY: General Education",
      "YCCS - CCA ACADEMY: General Education",
      "YCCS - PROGRESSIVE LEADERSHIP: General Education",
      "YCCS - PROGRESSIVE LEADERSHIP: General Education",
      "YCCS - YOUTH DEVELOPMENT: General Education",
      "YCCS - YOUTH DEVELOPMENT: General Education",
      "YCCS - CAMPOS: General Education",
      "YCCS - CAMPOS: General Education",
      "YCCS - INNOVATIONS: General Education",
      "YCCS - INNOVATIONS: General Education",
      "YCCS - ADDAMS: General Education",
      "YCCS - ADDAMS: General Education",
      "YCCS - LATINO YOUTH: General Education",
      "YCCS - LATINO YOUTH: General Education",
      "YCCS - OLIVE HARVEY: General Education",
      "YCCS - OLIVE HARVEY: General Education",
      "LITTLE BLACK PEARL HS: General Education",
      "LITTLE BLACK PEARL HS: General Education",
      "YCCS - SULLIVAN: General Education",
      "YCCS - SULLIVAN: General Education",
      "YCCS - TRUMAN: General Education",
      "YCCS - TRUMAN: General Education",
      "YCCS - WEST TOWN: General Education",
      "YCCS - WEST TOWN: General Education",
      "YCCS - WESTSIDE HOLISTIC: General Education",
      "YCCS - WESTSIDE HOLISTIC: General Education",
      "YCCS - YOUTH CONNECTION: General Education",
      "YCCS - YOUTH CONNECTION: General Education",
      "CAMELOT - EXCEL HS: General Education",
      "CAMELOT - EXCEL HS: General Education",
      "INSTITUTO - LOZANO HS: General Education",
      "INSTITUTO - LOZANO HS: General Education",
      "YCCS - CHATHAM: General Education",
      "YCCS - CHATHAM: General Education",
      "PATHWAYS - BRIGHTON PARK HS: General Education",
      "PATHWAYS - BRIGHTON PARK HS: General Education",
      "CAMELOT - EXCEL SOUTHSHORE HS: General Education",
      "CAMELOT - EXCEL SOUTHSHORE HS: General Education",
      "CAMELOT - EXCEL SOUTHWEST HS: General Education",
      "CAMELOT - EXCEL SOUTHWEST HS: General Education",
      "NORTHSIDE LEARNING HS: General Education",
      "NORTHSIDE LEARNING HS: General Education",
      "SOUTHSIDE HS: General Education",
      "SOUTHSIDE HS: General Education",
      "YORK HS: General Education",
      "YORK HS: General Education",
      "SIMPSON HS: General Education",
      "SIMPSON HS: General Education",
      "VAUGHN HS: General Education",
      "VAUGHN HS: General Education",
      "GRAHAM HS: General Education",
      "GRAHAM HS: General Education",
      "JEFFERSON HS: General Education",
      "JEFFERSON HS: General Education",
      "PEACE AND EDUCATION HS: General Education",
      "PEACE AND EDUCATION HS: General Education",
      "PATHWAYS - ASHBURN HS: General Education",
      "PATHWAYS - ASHBURN HS: General Education",
      "CAMELOT - EXCEL ENGLEWOOD HS: General Education",
      "CAMELOT - EXCEL ENGLEWOOD HS: General Education",
      "BRIDGESCAPE - LAWNDALE HS: General Education",
      "BRIDGESCAPE - LAWNDALE HS: General Education",
      "BRIDGESCAPE - ROSELAND HS: General Education",
      "BRIDGESCAPE - ROSELAND HS: General Education",
      "PATHWAYS - AVONDALE HS: General Education",
      "PATHWAYS - AVONDALE HS: General Education",
      "OMBUDSMAN - NORTHWEST HS: General Education",
      "OMBUDSMAN - NORTHWEST HS: General Education",
      "OMBUDSMAN - SOUTH HS: General Education",
      "OMBUDSMAN - SOUTH HS: General Education",
      "OMBUDSMAN - WEST HS: General Education",
      "OMBUDSMAN - WEST HS: General Education",
      "BRIDGESCAPE - HUMBOLDT PARK HS: General Education",
      "BRIDGESCAPE - HUMBOLDT PARK HS: General Education",
      "CAMELOT - SAFE HS: General Education",
      "CAMELOT - SAFE HS: General Education",
      "BRIDGESCAPE - BRAINERD HS: General Education",
      "BRIDGESCAPE - BRAINERD HS: General Education",
      "YCCS - VIRTUAL: General Education",
      "YCCS - VIRTUAL: General Education"
    ],
    "desc": "n/a",
    "fn": notImplemented
  },
  "8533c48c2dab7aaefba8095ffebbc6c7": {
    "id": "8533c48c2dab7aaefba8095ffebbc6c7",
    "programs": [
      "ACERO - SOTO HS: General Education"
    ],
    "desc": "Students are randomly selected by computerized lottery. The lottery is conducted in the following order: students currently enrolled in eighth grade at an Acero Elementary Charter School, sibling, general.",
    "fn": lottery(
      {
        filter: ifStudentAttendsOneOf(...ACERO_ES_PROGRAMS),
        size: LotteryStageSize.LARGE
      },
      SIBLING_LOTTERY_STAGE,
      GENERAL_LOTTERY_STAGE
    )
  },
  "f20ca1ea9f236a3dba8a031b1534ea9d": {
    "id": "f20ca1ea9f236a3dba8a031b1534ea9d",
    "programs": [
      "CHICAGO VOCATIONAL HS: Agricultural Sciences",
      "CHICAGO VOCATIONAL HS: Carpentry",
      "CHICAGO VOCATIONAL HS: Cosmetology",
      "CHICAGO VOCATIONAL HS: Culinary Arts",
      "CHICAGO VOCATIONAL HS: Diesel Technology",
      "CHICAGO VOCATIONAL HS: Early College STEM",
      "RICHARDS HS: Accounting",
      "RICHARDS HS: Culinary Arts",
      "NORTH-GRAND HS: Culinary Arts",
      "BOGAN HS: Entrepreneurship",
      "FARRAGUT HS: Automotive Technology",
      "FENGER HS: Carpentry",
      "FENGER HS: Culinary Arts",
      "FOREMAN HS: Digital Media",
      "FOREMAN HS: Web Design",
      "HARLAN HS: Digital Media",
      "HARLAN HS: Web Design",
      "HARPER HS: Culinary Arts",
      "HARPER HS: Digital Media",
      "HYDE PARK HS: Broadcast Technology",
      "HYDE PARK HS: Digital Media",
      "KELLY HS: Digital Media",
      "MANLEY HS: Culinary Arts",
      "MARSHALL HS: Agricultural Sciences",
      "MARSHALL HS: Culinary Arts",
      "MATHER HS: Game Programming & Web Design",
      "PHILLIPS HS: Digital Media",
      "ROOSEVELT HS: Culinary Arts",
      "ROOSEVELT HS: Early Childhood",
      "ROOSEVELT HS: Game Programming",
      "SCHURZ HS: Accounting & Entrepreneurship",
      "SCHURZ HS: Automotive Technology",
      "SCHURZ HS: Digital Media",
      "SULLIVAN HS: Accounting",
      "TILDEN HS: Culinary Arts",
      "WELLS HS: Game Programming",
      "CURIE HS: Accounting",
      "CURIE HS: Architecture",
      "CURIE HS: Automotive Technology",
      "CURIE HS: Broadcast Technology",
      "CURIE HS: Culinary Arts",
      "CURIE HS: Digital Media",
      "CURIE HS: Early Childhood & Teaching",
      "CURIE HS: Game Programming & Web Design",
      "CLEMENTE HS: Broadcast Technology",
      "CLEMENTE HS: Culinary Arts",
      "JULIAN HS: Broadcast Technology",
      "JULIAN HS: Digital Media",
      "JULIAN HS: Entrepreneurship",
      "JULIAN HS: Game Programming",
      "JUAREZ HS: Architecture",
      "JUAREZ HS: Automotive Technology",
      "JUAREZ HS: Culinary Arts",
      "JUAREZ HS: Game Programming & Web Design",
      "BOWEN HS: Manufacturing",
      "RABY HS: Broadcast Technology",
      "RABY HS: Culinary Arts",
      "RABY HS: Entrepreneurship",
      "UPLIFT HS: Teaching",
      "AUSTIN CCA HS: Manufacturing"
    ],
    "desc": "Students are randomly selected by computerized lottery. General Education and 504 Plan students: Preference is given to students with percentiles of 24 and above on the NWEA MAP in reading and math. A total of 30% of the seats will be made available to attendance area applicants.IEP and EL students: Preference is given to students with combined NWEA MAP scores that equal 48 or above.Note: Repeating 8th graders and students pushed into 8th grade from 6th grade due to age requirements qualify for selection but will be placed in a lower preference group.",
      // custom req fn -- req fn builders a little ungainly for handling
      // this kind of branching.
      "fn": (s, p) => {
        if( ifSkipped7OrRepeated8(s,p) ) {
          return SuccessChance.UNLIKELY
        } else if ( ifIEPorEL(s,p) ) {
          const passesGrades = ifHasGrades({nweaCombined: 48})(s, p);
          if( passesGrades ) { 
            return SuccessChance.LIKELY;
          } else {
            return SuccessChance.UNCERTAIN;
          }

        } else {
          const passesGrades = ifHasGrades({nweaBoth: 24})(s, p);
          if ( passesGrades ) {
            return SuccessChance.LIKELY;
          } else {
            return SuccessChance.UNCERTAIN;
          }
        }
      }
  },
  "ff47e67648939ff64830ddf7f1ad5ecb": {
    "id": "ff47e67648939ff64830ddf7f1ad5ecb",
    "programs": [
      "CHICAGO VOCATIONAL HS: General Education",
      "FENGER HS: General Education",
      "FOREMAN HS: General Education",
      "GAGE PARK HS: General Education",
      "HARPER HS: General Education",
      "HIRSCH HS: General Education",
      "MANLEY HS: General Education",
      "MARSHALL HS: General Education",
      "SCHURZ HS: General Education",
      "JULIAN HS: General Education",
      "HOPE HS: General Education",
      "BOWEN HS: General Education",
      "INFINITY HS: Science/Technology/Engineering/Math",
      "ORR HS: General Education",
      "AUSTIN CCA HS: General Education"
    ],
    "desc": "Students who live within the school's attendance boundary can be admitted automatically.Students who live outside of the school's attendance boundary are randomly selected by computerized lottery. The lottery is conducted in the following order: sibling, general.",
      "fn": conditional(
        {
          filter: ifInAttendBound,
          fn: accept(everyone)
        },
        {
          filter: everyone,
          fn: lottery(
            SIBLING_LOTTERY_STAGE,
            GENERAL_LOTTERY_STAGE
          )
        }
      )
  },
  "0a48374cc62558e04883ad444c85d185": {
    "id": "0a48374cc62558e04883ad444c85d185",
    "programs": [
      "JONES HS: Pre-Engineering",
      "JONES HS: Pre-Law",
      "HANCOCK HS: Pre-Engineering",
      "HANCOCK HS: Pre-Law",
      "VON STEUBEN HS: Science",
      "CHICAGO AGRICULTURE HS: Agricultural Sciences",
      "CLARK HS: Early College STEM",
      "CRANE MEDICAL HS: Health Sciences",
      "DISNEY II HS: Fine Arts & Technology"
    ],
    "desc": "General Education and 504 Plan students: Minimum percentile of 24 in both reading and math on NWEA MAP.IEP and EL students: Minimum combined percentile of 48 in reading and math on NWEA MAP.",
        "fn": conditional(
          {
            filter: ifIEPorEL,
            fn: accept(ifHasGrades({
              nweaCombined: 48,
            }))
          },
          {
            filter: everyone,
            fn: accept(ifHasGrades({
              nweaBoth: 24,
            }))
          }
        )
  },
  "be95903c95005a6422740fb8d3937098": {
    "id": "be95903c95005a6422740fb8d3937098",
    "programs": [
      "JONES HS: Pre-Engineering",
      "JONES HS: Pre-Law",
      "HANCOCK HS: Pre-Engineering",
      "HANCOCK HS: Pre-Law"
    ],
    "desc": "Eligible students are selected on a point system based on NWEA MAP scores and 7th grade final GPA. Students are ranked and selected from high to low. Students residing within the attendance overlay boundary of the school are selected first.",
    "fn": notImplemented
  },
  "91648015588db93f700a12d6e2825a41": {
    "id": "91648015588db93f700a12d6e2825a41",
    "programs": [
      "JONES HS: Selective Enrollment High School",
      "PAYTON HS: Selective Enrollment High School",
      "WESTINGHOUSE HS: Selective Enrollment High School",
      "HANCOCK HS: Selective Enrollment High School",
      "LANE TECH HS: Selective Enrollment High School",
      "BROOKS HS: Selective Enrollment High School",
      "KING HS: Selective Enrollment High School",
      "YOUNG HS: Selective Enrollment High School",
      "LINDBLOM HS: Selective Enrollment High School",
      "SOUTH SHORE INTL HS: Selective Enrollment High School"
    ],
    "desc": "General Education and 504 Plan students: Minimum percentile of 24 in both reading and math on NWEA MAP.IEP and EL students: Minimum combined percentile of 48 in reading and math on NWEA MAP.Testing is required for all eligible applicants.",
        "fn": conditional(
          {
            filter: ifIEPorEL,
            fn: accept(ifHasGrades({
              nweaCombined: 48,
            }))
          },
          {
            filter: everyone,
            fn: accept(ifHasGrades({
              nweaBoth: 24,
            }))
          }
        )
  },
  "5431b69db92fda0a54a40471ceeaffbe": {
    "id": "5431b69db92fda0a54a40471ceeaffbe",
    "programs": [
      "JONES HS: Selective Enrollment High School",
      "WESTINGHOUSE HS: Selective Enrollment High School",
      "HANCOCK HS: Selective Enrollment High School",
      "NORTHSIDE PREP HS: Selective Enrollment High School",
      "KING HS: Selective Enrollment High School",
      "SOUTH SHORE INTL HS: Selective Enrollment High School"
    ],
    "desc": "Eligible students are selected on a point system with a maximum of 900 points. Students are assigned points for 7th grade final grades, NWEA MAP scores, and the admissions test, each worth a maximum of 300 points. The first 30% of the available seats are filled by the top scoring students based on rank score; the remaining seats are equally distributed among the four socio-economic tiers and filled by the top-scoring students in each tier.",
    "fn": sePointSystem
  },
  "533b612ef295f4f1434c15d3788f2ac7": {
    "id": "533b612ef295f4f1434c15d3788f2ac7",
    "programs": [
      "PROSSER HS: International Baccalaureate (IB)",
      "AMUNDSEN HS: International Baccalaureate (IB)",
      "BOGAN HS: International Baccalaureate (IB)",
      "KELLY HS: International Baccalaureate (IB)",
      "KENNEDY HS: General Education",
      "KENNEDY HS: International Baccalaureate (IB)",
      "MORGAN PARK HS: International Baccalaureate (IB)",
      "SCHURZ HS: International Baccalaureate (IB)",
      "STEINMETZ HS: International Baccalaureate (IB)",
      "TAFT HS: International Baccalaureate (IB)",
      "WASHINGTON HS: International Baccalaureate (IB)",
      "JUAREZ HS: International Baccalaureate (IB)",
      "OGDEN HS: International Baccalaureate (IB)",
      "SOUTH SHORE INTL HS: International Baccalaureate (IB)",
      "BACK OF THE YARDS HS: International Baccalaureate (IB)"
    ],
    "desc": "General Education and 504 Plan students: Minimum percentile of 24 in both reading and math on NWEA MAP and minimum 2.5 GPA in 7th grade.IEP and EL students: Minimum combined percentile of 48 in reading and math on NWEA MAP and minimum 2.5 GPA in 7th grade.Attendance at an Information Session is required for all eligible applicants.",
        "fn": conditional(
          {
            filter: ifIEPorEL,
            fn: accept(ifHasGrades({
              nweaCombined: 48,
              gpa: 2.5
            }))
          },
          {
            filter: everyone,
            fn: accept(ifHasGrades({
              nweaBoth: 24,
              gpa: 2.5
            }))
          }
        )
  },
  "aac7cb82120d654deed9d6b90099ad43": {
    "id": "aac7cb82120d654deed9d6b90099ad43",
    "programs": [
      "PROSSER HS: International Baccalaureate (IB)",
      "BOGAN HS: International Baccalaureate (IB)",
      "KELLY HS: International Baccalaureate (IB)",
      "KENNEDY HS: International Baccalaureate (IB)",
      "SCHURZ HS: International Baccalaureate (IB)",
      "STEINMETZ HS: International Baccalaureate (IB)",
      "LINCOLN PARK HS: International Baccalaureate (IB)",
      "WASHINGTON HS: International Baccalaureate (IB)",
      "HUBBARD HS: International Baccalaureate (IB)",
      "CLEMENTE HS: International Baccalaureate (IB)",
      "JUAREZ HS: International Baccalaureate (IB)",
      "BRONZEVILLE HS: International Baccalaureate (IB)",
      "SOUTH SHORE INTL HS: International Baccalaureate (IB)",
      "BACK OF THE YARDS HS: International Baccalaureate (IB)"
    ],
    "desc": "Eligible students are selected on a point system. Points are based on NWEA MAP scores and 7th grade GPA. Students who live within the school's attendance boundary will be given 50 additional points. The school determines the minimum cutoff score for selections.",
    "fn": ibPointSystem
  },
  "a6d13f7782335a549d5570b549593ae8": {
    "id": "a6d13f7782335a549d5570b549593ae8",
    "programs": [
      "PAYTON HS: Selective Enrollment High School"
    ],
    "desc": "Eligible students are selected on a point system with a maximum of 900 points. Points are based on 7th grade final grades, NWEA MAP scores, and the admissions test, each worth a maximum of 300 points. The first 30% of the available seats are filled by the top scoring students based on rank score; the remaining seats are equally distributed among the four socio-economic tiers and filled by the top-scoring students in each tier.",
    "fn": sePointSystem
  },
  "7f6b2cf9083a60bc8f3fb117aed8aad5": {
    "id": "7f6b2cf9083a60bc8f3fb117aed8aad5",
    "programs": [
      "RICHARDS HS: General Education",
      "TILDEN HS: General Education",
      "SOLORIO HS: General Education"
    ],
    "desc": "Students who live within the school's attendance boundary can be admitted automatically.Students who live outside of the school's attendance boundary are randomly selected by computerized lottery.",
      "fn": conditional(
        {
          filter: ifInAttendBound,
          fn: accept(everyone)
        },
        {
          filter: everyone,
          fn: lottery(
            GENERAL_LOTTERY_STAGE
          )
        }
      )
  },
  "2700519dbace61b2fec27955e4d8eb87": {
    "id": "2700519dbace61b2fec27955e4d8eb87",
    "programs": [
      "NORTH-GRAND HS: General Education"
    ],
    "desc": "Students who live within the school's attendance boundary have no eligibility requirements.All applicants who live outside of the school's attendance boundary: Minimum GPA of 2.0 in 7th grade and 7th grade minimum attendance percentage of 90.",
      "fn": conditional(
        {
          filter: ifInAttendBound,
          fn: accept(everyone)
        },
        {
          filter: everyone,
          fn: accept(ifHasGrades({
            gpa: 2.0,
            attendance: 90
          }))
        }
      )
  },
  "4135e6341f9465c5a7398fd3935ca278": {
    "id": "4135e6341f9465c5a7398fd3935ca278",
    "programs": [
      "NORTH-GRAND HS: General Education",
      "ROBESON HS: General Education",
      "STEINMETZ HS: General Education"
    ],
    "desc": "Students who live within the school's attendance boundary can be admitted automatically.Eligible students who live outside of the school's attendance boundary are randomly selected by computerized lottery. The lottery is conducted in the following order: sibling, general.",
      "fn": conditional(
        {
          filter: ifInAttendBound,
          fn: accept(everyone)
        },
        {
          filter: everyone,
          fn: lottery(
            SIBLING_LOTTERY_STAGE,
            GENERAL_LOTTERY_STAGE
          )
        }
      )
  },
  "af80e4d92a8d53e2b096e2fc05f1d005": {
    "id": "af80e4d92a8d53e2b096e2fc05f1d005",
    "programs": [
      "SIMEON HS: Career Academy"
    ],
    "desc": "All applicants: Minimum combined percentile of 30 in reading and math on NWEA MAP, minimum 2.5 GPA in 7th grade, and 7th grade minimum attendance percentage of 85.Eligible students are required to participate in an interview.",
      "fn": accept(ifHasGrades({
        nweaCombined: 30,
        gpa: 2.5,
        attendance: 85
      }))
  },
  "d197c70a1f66489e4fb8a1e8357b5d43": {
    "id": "d197c70a1f66489e4fb8a1e8357b5d43",
    "programs": [
      "SIMEON HS: Career Academy"
    ],
    "desc": "Eligible students are selected on a point system. Points are based on the combined NWEA MAP scores and the interview.",
    "fn": notImplemented
  },
  "d00aa9a9fd5f38a78517ef3d60ddaa39": {
    "id": "d00aa9a9fd5f38a78517ef3d60ddaa39",
    "programs": [
      "WESTINGHOUSE HS: Career Academy"
    ],
    "desc": "General Education and 504 Plan students: Minimum percentile of 24 in both reading and math on NWEA MAP, minimum 3.0 GPA in 7th grade, and 7th grade minimum attendance percentage of 95.IEP and EL students: Minimum combined percentile of 48 in reading and math on NWEA MAP, minimum 3.0 GPA in 7th grade, and 7th grade minimum attendance percentage of 95.",
        "fn": conditional(
          {
            filter: ifIEPorEL,
            fn: accept(ifHasGrades({
              nweaCombined: 48,
              gpa: 3.0,
              attendance: 95
            }))
          },
          {
            filter: everyone,
            fn: accept(ifHasGrades({
              nweaBoth: 24,
              gpa: 3.0,
              attendance: 95
            }))
          }
        )
  },
  "7d739a7671ca60aeee72cf4dd6972a6a": {
    "id": "7d739a7671ca60aeee72cf4dd6972a6a",
    "programs": [
      "WESTINGHOUSE HS: Career Academy"
    ],
    "desc": "Eligible students are randomly selected by compterized lottery. The lottery is conducted in the following order: proximity, general.",
      "fn": lottery(
        PROXIMITY_LOTTERY_STAGE,
        GENERAL_LOTTERY_STAGE,
      )
  },
  "81d8618c886c7e6c4befe2e9084fa465": {
    "id": "81d8618c886c7e6c4befe2e9084fa465",
    "programs": [
      "AMUNDSEN HS: Game Programming & Web Design",
      "STEINMETZ HS: Digital Media"
    ],
    "desc": "Students are randomly selected by computerized lottery.General Education and 504 Plan students: Preference is given to students with percentiles of 24 and above on the NWEA MAP in reading and math. A total of 30% of the seats will be made available to attendance area applicants.IEP and EL students: Preference is given to students with combined NWEA MAP scores that equal 48 or above.Note: Repeating 8th graders and students pushed into 8th grade from 6th grade due to age requirements qualify for selection but will be placed in a lower preference group.",
      // custom req fn -- req fn builders a little ungainly for handling
      // this kind of branching.
      "fn": (s, p) => {
        if( ifSkipped7OrRepeated8(s,p) ) {
          return SuccessChance.UNLIKELY
        } else if ( ifIEPorEL(s,p) ) {
          const passesGrades = ifHasGrades({nweaCombined: 48})(s, p);
          if( passesGrades ) { 
            return SuccessChance.LIKELY;
          } else {
            return SuccessChance.UNCERTAIN;
          }

        } else {
          const passesGrades = ifHasGrades({nweaBoth: 24})(s, p);
          if ( passesGrades ) {
            return SuccessChance.LIKELY;
          } else {
            return SuccessChance.UNCERTAIN;
          }
        }
      }
  },
  "ac3c6599f1a78ef05f289e98db3440fe": {
    "id": "ac3c6599f1a78ef05f289e98db3440fe",
    "programs": [
      "AMUNDSEN HS: International Baccalaureate (IB)"
    ],
    "desc": "Eligible students are selected on a point system. Points are based on NWEA MAP scores and 7th grade GPA. Students who live within the school's attendance boundary will be given 50 additional points. The school determines the minimum cutoff score for selections. Preference is given to students who meet the minimum eligibility requirements, attend an Information Session, and are enrolled in the school’s Middle Years Programme partner, McPherson Elementary School.",
    "fn": ibPointSystem
  },
  "9577eb2bbb20c7dd18219dc8dd34b213": {
    "id": "9577eb2bbb20c7dd18219dc8dd34b213",
    "programs": [
      "BOGAN HS: Accounting"
    ],
    "desc": "Students are randomly selected by computerized lottery. General Education and 504 Plan Students: Preference is given to students with percentiles of 24 and above on the NWEA MAP in reading and math. A total of 30% of the seats will be made available to attendance area applicants.IEP and EL students: Preference is given to students with combined NWEA MAP scores that equal 48 or above.Note: Repeating 8th graders and students pushed into 8th grade from 6th grade due to age requirements qualify for selection but will be placed in a lower preference group.",
      // custom req fn -- req fn builders a little ungainly for handling
      // this kind of branching.
      "fn": (s, p) => {
        if( ifSkipped7OrRepeated8(s,p) ) {
          return SuccessChance.UNLIKELY
        } else if ( ifIEPorEL(s,p) ) {
          const passesGrades = ifHasGrades({nweaCombined: 48})(s, p);
          if( passesGrades ) { 
            return SuccessChance.LIKELY;
          } else {
            return SuccessChance.UNCERTAIN;
          }

        } else {
          const passesGrades = ifHasGrades({nweaBoth: 24})(s, p);
          if ( passesGrades ) {
            return SuccessChance.LIKELY;
          } else {
            return SuccessChance.UNCERTAIN;
          }
        }
      }
  },
  "abc2682d6f919356f6a88a788fa844ae": {
    "id": "abc2682d6f919356f6a88a788fa844ae",
    "programs": [
      "BOGAN HS: General Education"
    ],
    "desc": "Students who live within the school's attendance boundary have no eligibility requirements.All applicants who live outside of the school's attendance boundary: Minimum GPA of 2.5 in 7th grade and 7th grade minimum attendance percentage of 93.",
      "fn": conditional(
        {
          filter: ifInAttendBound,
          fn: accept(everyone)
        },
        {
          filter: everyone,
          fn: accept(ifHasGrades({
            gpa: 2.5,
            attendance: 93
          }))
        }
      )
  },
  "484e8b5e43183ac6bbcdf8a7c3714e31": {
    "id": "484e8b5e43183ac6bbcdf8a7c3714e31",
    "programs": [
      "BOGAN HS: General Education"
    ],
    "desc": "Students who live within the school's attendance boundary have no eligibility requirements and can be admitted automatically.Eligible students who live outside of the school's attendance boundary are randomly selected by computerized lottery.",
      "fn": conditional(
        {
          filter: ifInAttendBound,
          fn: accept(everyone)
        },
        {
          filter: everyone,
          fn: lottery(
            GENERAL_LOTTERY_STAGE
          )
        }
      )
  },
  "c669645e70fd8ec41652c3f7996c5db1": {
    "id": "c669645e70fd8ec41652c3f7996c5db1",
    "programs": [
      "FARRAGUT HS: General Education"
    ],
    "desc": "Students currently enrolled in the school's eighth grade will have a deadline to submit their intent to enroll in ninth grade if they wish to remain at the school.Students who live within the school's attendance boundary can be admitted automatically. This program only accepts students who are currently enrolled or who live within the school's attendance boundary.",
    // FIXME error in data? FARRAGUT HS does not appear to have any documented 8th grade program
    //"fn": accept(either(ifInAttendBound, ifStudentAttendsOneOf(FARRAGUT_ES_PROGRAM)))
    "fn": accept(ifInAttendBound)
  },
  "8f3ccb74778282abfef8bf72d76518ca": {
    "id": "8f3ccb74778282abfef8bf72d76518ca",
    "programs": [
      "FARRAGUT HS: International Baccalaureate (IB)",
      "HYDE PARK HS: International Baccalaureate (IB)",
      "CURIE HS: International Baccalaureate (IB)",
      "CLEMENTE HS: International Baccalaureate (IB)",
      "BRONZEVILLE HS: International Baccalaureate (IB)"
    ],
    "desc": "General Education and 504 Plan students: Minimum percentile of 24 in both reading and math on NWEA MAP and minimum 2.5 GPA in 7th grade.IEP and EL students: Minimum combined percentile of 48 in reading and math on NWEA MAP and minimum 2.5 GPA in 7th grade.Attendance is required at an Information Session for all eligible applicants.",
        "fn": conditional(
          {
            filter: ifIEPorEL,
            fn: accept(ifHasGrades({
              nweaCombined: 48,
              gpa: 2.5
            }))
          },
          {
            filter: everyone,
            fn: accept(ifHasGrades({
              nweaBoth: 24,
              gpa: 2.5
            }))
          }
        )
  },
  "2fdba6a65e304f63aa1a79e8cfbe110f": {
    "id": "2fdba6a65e304f63aa1a79e8cfbe110f",
    "programs": [
      "FARRAGUT HS: International Baccalaureate (IB)"
    ],
    "desc": "Eligible students are selected on a point system. Points are based on NWEA MAP scores and 7th grade GPA. Students who live within the school's attendance boundary will be given 50 additional points. The school determines the minimum cutoff score for selections. Preference is given to students who meet the minimum eligibility requirements, attend an Information Session, and are enrolled in the school’s Middle Years Programme partner, Madero Middle School.",
    "fn": ibPointSystem
  },
  "95f2aa5966a32abd7c66ff17401c2563": {
    "id": "95f2aa5966a32abd7c66ff17401c2563",
    "programs": [
      "FARRAGUT HS: JROTC",
      "SCHURZ HS: AVID"
    ],
    "desc": "All applicants: Minimum 2.0 GPA in 7th grade and 7th grade minimum attendance percentage of 85.",
      "fn": accept(ifHasGrades({
        gpa: 2.0,
        attendance: 85
      }))
  },
  "394b2ab44d3edd7932e911773190e3fb": {
    "id": "394b2ab44d3edd7932e911773190e3fb",
    "programs": [
      "FARRAGUT HS: JROTC",
      "ROBESON HS: Allied Health",
      "SCHURZ HS: AVID"
    ],
    "desc": "Eligible students are randomly selected by computerized lottery. The lottery is conducted in the following order: proximity, general.",
      "fn": lottery(
        PROXIMITY_LOTTERY_STAGE,
        GENERAL_LOTTERY_STAGE,
      )
  },
  "58b93dcecb9a7394e8533ae1aea76b29": {
    "id": "58b93dcecb9a7394e8533ae1aea76b29",
    "programs": [
      "FENGER HS: Honors"
    ],
    "desc": "General Education and 504 Plan students: Minimum percentile of 50 in both reading and math on NWEA MAP, and minimum 2.0 GPA in 7th grade.IEP and EL students: Minimum combined percentile of 100 in reading and math on NWEA MAP, and minimum 2.0 GPA in 7th grade.",
        "fn": conditional(
          {
            filter: ifIEPorEL,
            fn: accept(ifHasGrades({
              nweaCombined: 100,
              gpa: 2.0
            }))
          },
          {
            filter: everyone,
            fn: accept(ifHasGrades({
              nweaBoth: 50,
              gpa: 2.0
            }))
          }
        )
  },
  "9f6819519ecf5507665c28864693b840": {
    "id": "9f6819519ecf5507665c28864693b840",
    "programs": [
      "ROBESON HS: Allied Health"
    ],
    "desc": "All applicants: Minimum 2.5 GPA in 7th grade.",
      "fn": accept(ifHasGrades({
        gpa: 2.5
      }))
  },
  "7e53e06871dc44ac449e4a26f10c16b5": {
    "id": "7e53e06871dc44ac449e4a26f10c16b5",
    "programs": [
      "HARLAN HS: General Education"
    ],
    "desc": "Students who live within the school's attendance boundary have no eligibility requirements.Students who live outside of the school's attendance boundary:General Education and 504 Plan students: Minimum percentile of 24 in both reading and math on NWEA MAP and 7th grade minimum attendance percentage of 85.IEP and EL students: Minimum combined percentile of 40 in reading and math on NWEA MAP and 7th grade minimum attendance percentage of 85.",
      "fn": conditional(
        {
          filter: ifInAttendBound,
          fn: accept(everyone)
        },
        {
          filter: ifIEPorEL,
          fn: accept(ifHasGrades({
            nweaCombined: 40,
            attendance: 85
          }))
        },
        {
          filter: everyone,
          fn: accept(ifHasGrades({
            nweaBoth: 24,
            attendance: 85
          }))
        }
      )
  },
  "6ba3cf64a3dae03eb3e8d0154d907209": {
    "id": "6ba3cf64a3dae03eb3e8d0154d907209",
    "programs": [
      "HARLAN HS: General Education"
    ],
    "desc": "Students who live within the school's attendance boundary have no eligibilty requirements and can be admitted automatically.Eligible students who live outside of the school's attendance boundary are randomly selected by computerized lottery. The lottery is conducted in the following order: sibling, general.",
      "fn": conditional(
        {
          filter: ifInAttendBound,
          fn: accept(everyone)
        },
        {
          filter: everyone,
          fn: lottery(
            SIBLING_LOTTERY_STAGE,
            GENERAL_LOTTERY_STAGE
          )
        }
      )
  },
  "acbc0fbc1218124b300a0ff16ba2b1e4": {
    "id": "acbc0fbc1218124b300a0ff16ba2b1e4",
    "programs": [
      "HARLAN HS: Pre-Engineering"
    ],
    "desc": "General Education and 504 Plan students: Minimum percentile of 24 in both reading and math on the NWEA MAP.IEP and EL students: Minimum combined percentile of 48 in reading and math on NWEA MAP.",
        "fn": conditional(
          {
            filter: ifIEPorEL,
            fn: accept(ifHasGrades({
              nweaCombined: 48,
            }))
          },
          {
            filter: everyone,
            fn: accept(ifHasGrades({
              nweaBoth: 24,
            }))
          }
        )
  },
  "6c58466133da2a8bcd2beb04684a6461": {
    "id": "6c58466133da2a8bcd2beb04684a6461",
    "programs": [
      "HARLAN HS: Pre-Engineering"
    ],
    "desc": "Eligible students are randomly selected by computerized lottery. Preference is given to students with a sibling who is currently enrolled and will be enrolled in the upcoming school year.",
      "fn": lottery(
        SIBLING_LOTTERY_STAGE,
        GENERAL_LOTTERY_STAGE
      )
  },
  "256c0431ffbca307c8ee290e713123a5": {
    "id": "256c0431ffbca307c8ee290e713123a5",
    "programs": [
      "HYDE PARK HS: General Education"
    ],
    "desc": "Students who live within the school's attendance area can be admitted automatically.Students who live outside of the school's attendance boundary are randomly selected by computerized lottery. The lottery is conducted in the following order: students currently enrolled in Carnegie Elementary School, sibling, general.",
      "fn": lottery(
        {
          filter: ifStudentAttendsOneOf(...CARNEGIE_ES_PROGRAMS),
          size: LotteryStageSize.LARGE
        },
        SIBLING_LOTTERY_STAGE,
        GENERAL_LOTTERY_STAGE
      )
  },
  "39d10a7124ac408941ac081583beb537": {
    "id": "39d10a7124ac408941ac081583beb537",
    "programs": [
      "HYDE PARK HS: International Baccalaureate (IB)"
    ],
    "desc": "Eligible students are selected on a point system. Points are based on NWEA MAP scores and 7th grade GPA. Students who live within the school's attendance boundary will be given 50 additional points. The school determines the minimum cutoff score for selections.  Preference is given to students who meet the minimum eligibilty requirements, attend an Information Session, and are enrolled in the school’s Middle Years Programme partner, Carnegie Elementary School.",
    "fn": ibPointSystem
  },
  "df37a96ae8b0456097dbc0fc1fd01b01": {
    "id": "df37a96ae8b0456097dbc0fc1fd01b01",
    "programs": [
      "KELLY HS: AVID"
    ],
    "desc": "General Education and 504 Plan students: Minimum percentile of 40 in reading on NWEA MAP, minimum 2.0 GPA in 7th grade, and 7th grade minimum attendance percentage of 80.IEP and EL students: Minimum 2.0 GPA in 7th grade, and 7th grade minimum attendance percentage of 80.Eligible students must submit letters of recommendation, write an essay, and participate in an interview.",
        "fn": conditional(
          {
            filter: ifIEPorEL,
            fn: accept(ifHasGrades({
              gpa: 2.0,
              attendance: 80 
            }))
          },
          {
            filter: everyone,
            fn: accept(ifHasGrades({
              nweaRead: 40,
              gpa: 2.0,
              attendance: 80
            }))
          }
        )
  },
  "2a0bc8e57026e371be1ef1a488163abd": {
    "id": "2a0bc8e57026e371be1ef1a488163abd",
    "programs": [
      "KELLY HS: AVID"
    ],
    "desc": "Eligible students are selected on a point system. Points are based on teacher recommendation letter(s), the essay, and the interview.",
    "fn": notImplemented
  },
  "e3eee4e3adacfe4856e180e50d542ff9": {
    "id": "e3eee4e3adacfe4856e180e50d542ff9",
    "programs": [
      "KELVYN PARK HS: General Education"
    ],
    "desc": "Students who live within the school's attendance boundary have no eligibility requirements.All applicants who live outside of the school's attendance boundary: Minimum 2.5 GPA in 7th grade and 7th grade minimum attendance percentage of 85.Eligible students who live outside of the schoool's attendance boundary are required to participate in an interview.",
      "fn": conditional(
        {
          filter: ifInAttendBound,
          fn: accept(everyone)
        },
        {
          filter: everyone,
          fn: accept(ifHasGrades({
            gpa: 2.5,
            attendance: 85
          }))
        }
      )
  },
  "4d51d4aee86b09eb78788eec6fe11916": {
    "id": "4d51d4aee86b09eb78788eec6fe11916",
    "programs": [
      "KELVYN PARK HS: General Education"
    ],
    "desc": "Students currently enrolled in the school's eighth grade will have a deadline to submit their intent to enroll in ninth grade if they wish to remain at the school.Students who live within the school's attendance boundary have no eligibility requirements and can be admitted automatically.Eligible students who are not currently enrolled in the school and live outside of the school's attendance boundary are selected on a point system. Points are based on NWEA MAP scores, 7th grade GPA, and the interview.",
      "fn": conditional(
        {
          filter: ifInAttendBound,
          fn: accept(everyone)
        },
        {
          filter: everyone,
          fn: notImplemented
        }
      )
  },
  "14ab60dbf2e4fb9ed6788a3a40a45db7": {
    "id": "14ab60dbf2e4fb9ed6788a3a40a45db7",
    "programs": [
      "LAKE VIEW HS: Early College STEM"
    ],
    "desc": "General Education and 504 Plan students: Minimum percentile of 50 in both reading and math on NWEA MAP, minimum 3.25 GPA in 7th grade, and 7th grade minimum attendance percentage of 93.IEP and EL students: Minimum combined percentile of 50 in reading and math on NWEA MAP, minimum 3.25 GPA in 7th grade, and 7th grade minimum attendance percentage of 93.",
        "fn": conditional(
          {
            filter: ifIEPorEL,
            fn: accept(ifHasGrades({
              nweaCombined: 50,
              gpa: 3.25,
              attendance: 93
            }))
          },
          {
            filter: everyone,
            fn: accept(ifHasGrades({
              nweaBoth: 50,
              gpa: 3.25,
              attendance: 93
            }))
          }
        )
  },
  "a9054920ac294d051cc9a97bf2cd31b4": {
    "id": "a9054920ac294d051cc9a97bf2cd31b4",
    "programs": [
      "LANE TECH HS: Selective Enrollment High School",
      "YOUNG HS: Selective Enrollment High School",
      "LINDBLOM HS: Selective Enrollment High School"
    ],
    "desc": "Students currently enrolled in the school's Academic Center will have a deadline to submit their intent to enroll in ninth grade if they wish to remain in the school.Eligible students who are not currently enrolled in the school are selected on a point system with a maximum of 900 points. Students are assigned points for 7th grade final grades, NWEA MAP scores, and the admissions test, each worth a maximum of 300 points. The first 30% of the available seats are filled by the top scoring students based on rank score; the remaining seats are equally distributed among the four socio-economic tiers and filled by the top-scoring students in each tier.",
    "fn": sePointSystem
  },
  "b64c24c07288e5ad3949ba2d6fb33b2d": {
    "id": "b64c24c07288e5ad3949ba2d6fb33b2d",
    "programs": [
      "MATHER HS: General Education"
    ],
    "desc": "Students who live within the school's attendance boundary can be admitted automatically.Students who live outside of the school's attendance boundary are randomly selected by computerized lottery. The lottery is conducted in the following order: Students currently enrolled in Boone, Clinton, Jamieson, Peterson, Rogers, or West Ridge; sibling; general.",
      "fn": conditional(
        { 
          filter: ifInAttendBound, 
          fn: accept(everyone) 
        },
        { 
          filter: everyone,
          fn: lottery(
            {
              filter: ifStudentAttendsOneOf(
                BOONE_ES_PROGRAM,
                CLINTON_ES_PROGRAM,
                JAMIESON_OPEN_ENROLLMENT_ES_PROGRAM,
                JAMIESON_GENERAL_EDUCATION_ES_PROGRAM,
                PETERSON_ES_PROGRAM,
                ROGERS_ES_PROGRAM,
                WEST_RIDGE_ES_PROGRAM,
              ),
              size: LotteryStageSize.LARGE
            },
            SIBLING_LOTTERY_STAGE,
            GENERAL_LOTTERY_STAGE
          )
        }
      )
  },
  "7a6aa9593532ceaefefa31fa96c82b48": {
    "id": "7a6aa9593532ceaefefa31fa96c82b48",
    "programs": [
      "MORGAN PARK HS: General Education"
    ],
    "desc": "Students currently enrolled in the school's Academic Center will have a deadline to submit their intent to enroll in ninth grade if they wish to enroll in the school's general education program.Students who live within the school's attendance boundary can be admitted automatically.Students who live outside of the school's attendance boundary are randomly selected by computerized lottery. The lottery is conducted in the following order: sibling, general.",
      "fn": conditional(
        {
          filter: ifStudentAttendsOneOf(MORGAN_PARK_ACADEMIC_CENTER_PROGRAM),
          fn: accept(everyone)
        },
        {
          filter: ifInAttendBound,
          fn: accept(everyone)
        },
        {
          filter: everyone,
          fn: lottery(
            SIBLING_LOTTERY_STAGE,
            GENERAL_LOTTERY_STAGE
          )
        }
      )
  },
  "4e044fe0d2563eec18894bba9891a519": {
    "id": "4e044fe0d2563eec18894bba9891a519",
    "programs": [
      "MORGAN PARK HS: International Baccalaureate (IB)",
      "TAFT HS: International Baccalaureate (IB)"
    ],
    "desc": "Eligible students are selected on a point system. Points are based on NWEA MAP scores and 7th grade GPA. Students who live within the school's attendance boundary will be given 50 additional points. The school determines the minimum cutoff score for selections. Preference is given to students who meet the minimum eligibility requirements, attend an Information Session, and are enrolled in the school’s Academic Center.",
    "fn": ibPointSystem
  },
  "6f8d77caa2c9129325844faa9a2114bb": {
    "id": "6f8d77caa2c9129325844faa9a2114bb",
    "programs": [
      "MORGAN PARK HS: World Language & International Studies"
    ],
    "desc": "General Education and 504 Plan students: Minimum percentile of 50 in both reading and math on the NWEA MAP and minimum 3.0 GPA in 7th grade.IEP and EL students: Minimum combined percentile of 100 in reading and math on NWEA MAP and minimum 3.0 GPA in 7th grade.",
        "fn": conditional(
          {
            filter: ifIEPorEL,
            fn: accept(ifHasGrades({
              nweaCombined: 100,
              gpa: 3.0,
            }))
          },
          {
            filter: everyone,
            fn: accept(ifHasGrades({
              nweaBoth: 50,
              gpa: 3.0,
            }))
          }
        )
  },
  "38b87c1a4567efe00d3444de18fc116e": {
    "id": "38b87c1a4567efe00d3444de18fc116e",
    "programs": [
      "BROOKS HS: Selective Enrollment High School"
    ],
    "desc": "Students currently enrolled in the school's Academic Center will have a deadline to submit their intent to enroll in ninth grade if they wish to remain at the school.Eligible students who are not currently enrolled in the school are selected on a point system with a maximum of 900 points. Students are assigned points for 7th grade final grades, NWEA MAP scores, and the admissions test, each worth a maximum of 300 points. The first 30% of the available seats are filled by the top scoring students based on rank score; the remaining seats are equally distributed among the four socio-economic tiers and filled by the top-scoring students in each tier.",
    // TODO CONSIDER add academic center to this? Low priority, the kids in the Brooks Academic Center probably don't need to be reminded that they can get into Brooks automatically.
    "fn": sePointSystem
  },
  "e45fbb0a1ef062a9da938ef00dbbd8ed": {
    "id": "e45fbb0a1ef062a9da938ef00dbbd8ed",
    "programs": [
      "PHILLIPS HS: General Education"
    ],
    "desc": "Students who live within the school's attendance boundary have no eligibility requirements.Students who live outside of the school's attendance boundary:General Education and 504 Plan students: Minimum percentile of 24 in both reading and math on NWEA MAP, minimum 2.5 GPA in 7th grade, and 7th grade minimum attendance percentage of 90.IEP and EL students: Minimum combined percentile of 48 in reading and math on NWEA MAP, and 7th grade minimum attendance percentage of 90.",
      "fn": conditional(
        {
          filter: ifInAttendBound,
          fn: accept(everyone)
        },
        {
          filter: ifIEPorEL,
          fn: accept(ifHasGrades({
            nweaCombined: 48,
            attendance: 90
          }))
        },
        {
          filter: everyone,
          fn: accept(ifHasGrades({
            nweaBoth: 24,
            gpa: 2.5,
            attendance: 90
          }))
        }
      )
  },
  "0161de8a29d2c7e258b53297e2f82d8a": {
    "id": "0161de8a29d2c7e258b53297e2f82d8a",
    "programs": [
      "PHILLIPS HS: General Education",
      "CLEMENTE HS: General Education",
      "MULTICULTURAL HS: Fine & Performing Arts",
      "WORLD LANGUAGE HS: General Education"
    ],
    "desc": "Students who live within the school's attendance boundary have no eligibility requirements and can be admitted automatically.Eligible students who live outside of the school's attendance boundary are randomly selected by computerized lottery. The lottery is conducted in the following order: sibling, general.",
      "fn": conditional(
        {
          filter: ifInAttendBound,
          fn: accept(everyone)
        },
        {
          filter: everyone,
          fn: lottery(
            SIBLING_LOTTERY_STAGE,
            GENERAL_LOTTERY_STAGE
          )
        }
      )
  },
  "acc0956ed7e04b918c25ead1cd65b22d": {
    "id": "acc0956ed7e04b918c25ead1cd65b22d",
    "programs": [
      "ROOSEVELT HS: General Education"
    ],
    "desc": "Students currently enrolled in the school's eighth grade will have a deadline to submit their intent to enroll in ninth grade if they wish to remain at the school.Students who live within the school's attendance boundary can be admitted automatically.This program only accepts currently enrolled students and students who live within the school's attendance boundary.",
      // FIXME Roosevelt HS has an 8th grade program for some reason? Not sure how to represent it.
      //"fn": accept(either(ifInAttendBound, ifStudentAttendsOneOf(ROOSEVELT_ES_PROGRAM)))
    "fn": accept(ifInAttendBound)

  },
  "0b625f618ffd5ef0fa10b8c17ec862e7": {
    "id": "0b625f618ffd5ef0fa10b8c17ec862e7",
    "programs": [
      "SCHURZ HS: Dual Language",
      "BACK OF THE YARDS HS: Dual Language"
    ],
    "desc": "General Education and 504 Plan students: Minimum percentile of 40 in both reading and math on NWEA MAP, minimum 3.0 GPA in 7th grade, LAS Links Assessment composite of 4 or STAMP Assessment at the Intermediate Level.IEP and EL students: Minimum combined percentile of 80 in reading and math on NWEA MAP, minimum 3.0 GPA in 7th grade, LAS Links Assessment composite of 4 or STAMP Assessment at the Intermediate Level.Students without LAS Links and/or STAMP scores will be contacted by the Office of Language and Cultural Education to arrange for these assessments.",
    "fn": notImplemented
  },
  "22c191a196cc6cf2b5450138ac49347e": {
    "id": "22c191a196cc6cf2b5450138ac49347e",
    "programs": [
      "SCHURZ HS: Dual Language",
      "BACK OF THE YARDS HS: Dual Language"
    ],
    "desc": "Eligible students are randomly selected by computerized lottery. The lottery is conducted in the following order: sibling, students currently enrolled in a CPS elementary school with a world language or dual language program, general.",
     // TODO implement if and when we have application requirements; getting hold of an updated list of ES schools with world language programs is also difficult.
    "fn": notImplemented
  },
  "25695a38888ae79b4b319f55325a8fc8": {
    "id": "25695a38888ae79b4b319f55325a8fc8",
    "programs": [
      "SENN HS: Dance",
      "SENN HS: Music",
      "SENN HS: Theatre",
      "CURIE HS: Dance",
      "CURIE HS: Music"
    ],
    "desc": "General Education and 504 Plan students: Minimum percentile of 24 in both reading and math on NWEA MAP.IEP and EL students: Minimum combined percentile of 48 in reading and math on NWEA MAP.An audition is required for all eligible applicants.",
        "fn": conditional(
          {
            filter: ifIEPorEL,
            fn: accept(ifHasGrades({
              nweaCombined: 48,
            }))
          },
          {
            filter: everyone,
            fn: accept(ifHasGrades({
              nweaBoth: 24
            }))
          }
        )
  },
  "2e9faab0334f16aee514c34ebc1b64f8": {
    "id": "2e9faab0334f16aee514c34ebc1b64f8",
    "programs": [
      "SENN HS: Dance",
      "SENN HS: Music",
      "SENN HS: Theatre",
      "CURIE HS: Dance",
      "CURIE HS: Music"
    ],
    "desc": "Eligible students are selected on a point system. Points are based on the student's NWEA MAP scores in reading and math, 7th grade final (cumulative) grades, and the audition.",
    "fn": notImplemented
  },
  "60e87e808d7bef3e367ab81e2a91e97a": {
    "id": "60e87e808d7bef3e367ab81e2a91e97a",
    "programs": [
      "SENN HS: International Baccalaureate (IB)"
    ],
    "desc": "General Education/504 Plan students: Minimum percentile of 24 in both reading and math on NWEA MAP and minimum 2.5 GPA in 7th grade.IEP and EL students: Minimum combined percentile of 48 in reading and math on NWEA MAP and minimum 2.5 GPA in 7th grade.Attendance at an Information Session is required for all eligible applicants.",
        "fn": conditional(
          {
            filter: ifIEPorEL,
            fn: accept(ifHasGrades({
              nweaCombined: 48,
              gpa: 2.5
            }))
          },
          {
            filter: everyone,
            fn: accept(ifHasGrades({
              nweaBoth: 24,
              gpa: 2.5
            }))
          }
        )
  },
  "9d7b76a14f7b8d4a4359b85eda533f43": {
    "id": "9d7b76a14f7b8d4a4359b85eda533f43",
    "programs": [
      "SENN HS: International Baccalaureate (IB)"
    ],
    "desc": "Eligible students are selected on a point system. Points are based on NWEA MAP scores and 7th grade GPA. Students who live within the school's attendance boundary will be given 50 additional points. The school determines the minimum cutoff score for selections. Preference is given to students who meet the minimum eligibility requirements, attend an Information Session, and are enrolled in the school’s Middle Years Programme partner, Peirce Elementary School.",
    "fn": ibPointSystem
  },
  "fe8d319e29e73aa0ac0cf0bf1e3b3909": {
    "id": "fe8d319e29e73aa0ac0cf0bf1e3b3909",
    "programs": [
      "SENN HS: Visual Arts"
    ],
    "desc": "General Education and 504 Plan students: Minimum percentile of 24 in both reading and math on NWEA MAP.IEP and EL students: Minimum combined percentile of 48 in reading and math on NWEA MAP.A portfolio review is required for all eligible applicants.",
        "fn": conditional(
          {
            filter: ifIEPorEL,
            fn: accept(ifHasGrades({
              nweaCombined: 48,
            }))
          },
          {
            filter: everyone,
            fn: accept(ifHasGrades({
              nweaBoth: 24
            }))
          }
        )
  },
  "07bc9ef974959f3e241aa2c8dd6909a6": {
    "id": "07bc9ef974959f3e241aa2c8dd6909a6",
    "programs": [
      "SENN HS: Visual Arts"
    ],
    "desc": "Eligible students are selected on a point system. Points are based on the student's NWEA MAP scores in reading and math, 7th grade final (cumulative) grades, and the portfolio review.",
    "fn": notImplemented
  },
  "0813497f90b1d9b3612279aca95c38dc": {
    "id": "0813497f90b1d9b3612279aca95c38dc",
    "programs": [
      "STEINMETZ HS: General Education"
    ],
    "desc": "Students who live within the school's attendance boundary have no eligibility requirements.Students who live outside of the school's attendance boundary:General Education and 504 Plan students: Minimum percentile of 45 in both reading and math on NWEA MAP, minimum GPA of 2.0 in 7th grade, and 7th grade minimum attendance percentage of 90.IEP and EL students: Minimum combined percentile of 90 in reading and math on NWEA MAP, minimum GPA of 2.0 in 7th grade, and 7th grade minimum percentage of 90.",
      "fn": conditional(
        {
          filter: ifInAttendBound,
          fn: accept(everyone)
        },
        {
          filter: ifIEPorEL,
          fn: accept(ifHasGrades({
            nweaCombined: 90,
            gpa: 2.0,
            attendance: 90
          }))
        },
        {
          filter: everyone,
          fn: accept(ifHasGrades({
            nweaBoth: 45,
            gpa: 2.0,
            attendance: 90
          }))
        }
      )
  },
  "166b2c2699276401188c5f1a52f4505b": {
    "id": "166b2c2699276401188c5f1a52f4505b",
    "programs": [
      "STEINMETZ HS: JROTC"
    ],
    "desc": "General Education and 504 Plan students: Minimum percentile of 45 in both reading and math on NWEA MAP and minimum 2.0 GPA in 7th grade.IEP and EL students: Minimum combined percentile of 90 in reading and math on NWEA MAP, and minimum 2.0 GPA in 7th grade.",
      "fn": conditional(
        {
          filter: ifIEPorEL,
          fn: accept(ifHasGrades({
            nweaCombined: 90,
            gpa: 2.0,
          }))
        },
        {
          filter: everyone,
          fn: accept(ifHasGrades({
            nweaBoth: 45,
            gpa: 2.0,
          }))
        }
      )
  },
  "aa1c5d5c87446be3413ddbb110e63e59": {
    "id": "aa1c5d5c87446be3413ddbb110e63e59",
    "programs": [
      "SULLIVAN HS: General Education"
    ],
    "desc": "Students who live within the school's attendance boundary can be admitted automatically.Students who live outside of the school's attendance boundary are randomly selected by computerized lottery. The lottery is conducted in the following order: students attending Boone, Field, Gale, Hayt, Jordan, Kilmer, McCutcheon, McPherson, or West Ridge Elementary Schools; sibling; general.",
      "fn": conditional(
        {
          filter: ifInAttendBound,
          fn: accept(everyone)
        },
        {
          filter: everyone,
          fn: lottery(
            {
              filter: ifStudentAttendsOneOf(
                BOONE_ES_PROGRAM,
                FIELD_ES_PROGRAM,
                GALE_ES_PROGRAM,
                HAYT_ES_PROGRAM,
                JORDAN_ES_PROGRAM,
                KILMER_ES_PROGRAM,
                MCCUTCHEON_ES_PROGRAM,
                MCPHERSON_ES_PROGRAM,
                WEST_RIDGE_ES_PROGRAM
              ),
              size: LotteryStageSize.LARGE
            },
            SIBLING_LOTTERY_STAGE,
            GENERAL_LOTTERY_STAGE
          )
        }
      )
  },
  "06b87b89afadb843fbb9e8d63e932926": {
    "id": "06b87b89afadb843fbb9e8d63e932926",
    "programs": [
      "TAFT HS: General Education"
    ],
    "desc": "Students currently enrolled in the school's eighth grade will have a deadline to submit their intent to enroll in ninth grade if they wish to enroll in the school's general education program.Students enrolled in the Taft Academic Center or students who live within the school's attendance boundary can be admitted automatically.This program only accepts students who live within the school's attendance boundary or who attend the school's Academic Center.",
    "fn": accept(either(ifInAttendBound, ifStudentAttendsOneOf(TAFT_ACADEMIC_CENTER_PROGRAM)))
  },
  "6a9d740446a80d4b9ed8f76eee54d83f": {
    "id": "6a9d740446a80d4b9ed8f76eee54d83f",
    "programs": [
      "TAFT HS: NJROTC"
    ],
    "desc": "General Education and 504 Plan students: Minimum percentile of 24 in both reading and math on NWEA MAP.IEP and EL students: Minimum combined percentile of 48 in reading and math on NWEA MAP.Eligible applicants must participate in an interview.",
      "fn": conditional(
        {
          filter: ifIEPorEL,
          fn: accept(ifHasGrades({
            nweaCombined: 48 
          }))
        },
        {
          filter: everyone,
          fn: accept(ifHasGrades({
            nweaBoth: 24
          }))
        }

      )
  },
  "fc080e1ea8e3103d38a6970255becd5a": {
    "id": "fc080e1ea8e3103d38a6970255becd5a",
    "programs": [
      "TAFT HS: NJROTC"
    ],
    "desc": "Eligible students are selected on a point system. Points are based on the student's NWEA MAP scores and the interview.",
    "fn": notImplemented
  },
  "e64b5c5d6ac69f8bd45231e20ca63aed": {
    "id": "e64b5c5d6ac69f8bd45231e20ca63aed",
    "programs": [
      "VON STEUBEN HS: Scholars"
    ],
    "desc": "General Education and 504 Plan students: Minimum percentile of 60 in both reading and math on NWEA MAP and minimum 3.0 GPA in 7th grade.IEP and EL students: Minimum combined percentile of 120 in reading and math on NWEA MAP and minimum 3.0 GPA in 7th grade.Eligible students must submit teacher recommendations and an essay. Online applicants will be prompted to upload their documents via the online application site. Paper applicants should visit www.vonsteuben.org for submission details (click 'Apply' and 'Scholars Program').Applicants who are not eligible will automatically be included in the computerized lottery selection process for the Von Steuben Science Program.",
      "fn": conditional(
        {
          filter: ifIEPorEL,
          fn: accept(ifHasGrades({
            nweaCombined: 120,
            gpa: 3.0
          }))
        },
        {
          filter: everyone,
          fn: accept(ifHasGrades({
            nweaBoth: 60,
            gpa: 3.0,
          }))
        }
      )
  },
  "531ae8396ef38697b0d289d9282a0f84": {
    "id": "531ae8396ef38697b0d289d9282a0f84",
    "programs": [
      "VON STEUBEN HS: Scholars"
    ],
    "desc": "Eligible students are selected on a point system. Points are based on the teacher recommendations and the essay.",
    "fn": notImplemented
  },
  "1186691804ec1aadb878d4be54269174": {
    "id": "1186691804ec1aadb878d4be54269174",
    "programs": [
      "VON STEUBEN HS: Science",
      "CHICAGO AGRICULTURE HS: Agricultural Sciences",
      "CLARK HS: Early College STEM",
      "CRANE MEDICAL HS: Health Sciences"
    ],
    "desc": "Eligible students are randomly selected by computerized lottery. The lottery is conducted in the following order: sibling, proximity, tiers.",
      "fn": lottery(
        SIBLING_LOTTERY_STAGE,
        PROXIMITY_LOTTERY_STAGE,
        TIER_LOTTERY_STAGE
      )
  },
  "fe44452f3084984bede04dc96152eabf": {
    "id": "fe44452f3084984bede04dc96152eabf",
    "programs": [
      "LINCOLN PARK HS: Drama"
    ],
    "desc": "General Education and 504 Plan students: Minimum percentile of 60 in both reading and math on NWEA MAP and minimum 2.75 GPA in 7th grade.IEP and EL students: Minimum combined percentile of 120 in reading and math on NWEA MAP and minimum 2.75 GPA in 7th grade.An audition is required for eligible applicants.",
      "fn": conditional(
        {
          filter: ifIEPorEL,
          fn: accept(ifHasGrades({
            nweaCombined: 120,
            gpa: 2.75
          }))
        },
        {
          filter: everyone,
          fn: accept(ifHasGrades({
            nweaBoth: 60,
            gpa: 2.75,
          }))
        }
      )
  },
  "d5c1f24e75c395e552a0d6ce8f0b5bcc": {
    "id": "d5c1f24e75c395e552a0d6ce8f0b5bcc",
    "programs": [
      "LINCOLN PARK HS: Drama"
    ],
    "desc": "Eligible students are selected on a point system. Points are based on the student's NWEA MAP scores in reading and math, 7th grade GPA, and the audition.",
    "fn": notImplemented
  },
  "bac878b6b3797b37a26f1bb2c7e356d1": {
    "id": "bac878b6b3797b37a26f1bb2c7e356d1",
    "programs": [
      "LINCOLN PARK HS: Honors/Double Honors"
    ],
    "desc": "Students who live within the school's attendance boundary have no eligibility requirements.All applicants who live outside of the school's attendance boundary: Minimum combined percentile of 135 in reading and math on NWEA MAP and minimum 3.0 GPA in 7th grade.",
      "fn": conditional(
        {
          filter: ifInAttendBound,
          fn: accept(everyone)
        },
        {
          filter: everyone,
          fn: accept(ifHasGrades({
            nweaCombined: 135,
            gpa: 3.0
          }))
        }
      )
  },
  "d801dab5b4c1b17fd4f87ff20b0a8cbc": {
    "id": "d801dab5b4c1b17fd4f87ff20b0a8cbc",
    "programs": [
      "LINCOLN PARK HS: Honors/Double Honors"
    ],
    "desc": "Students who live within the school's attendance boundary have no eligibility requirements and can be admitted automatically.Eligible students who live outside the school's attendance boundary are selected on a point system. Points are based on the student's NWEA MAP scores in reading and math and 7th grade GPA.",
      "fn": conditional(
        {
          filter: ifInAttendBound,
          fn: accept(everyone)
        },
        {
          filter: everyone,
          fn:  notImplemented
        }
      )
  },
  "2868d8b48df2bb6085568f0889ff859d": {
    "id": "2868d8b48df2bb6085568f0889ff859d",
    "programs": [
      "LINCOLN PARK HS: International Baccalaureate (IB)"
    ],
    "desc": "General Education and 504 Plan students: Minimum percentile of 24 in both reading and math on NWEA MAP and minimum 2.5 GPA in 7th grade.IEP and EL students: Minimum combined percentile of 48 in reading and math on NWEA MAP and minimum 2.5 GPA in 7th grade.Attendance at an Information Session is required for all eliglble applicants.",
      "fn": conditional(
        {
          filter: ifIEPorEL,
          fn: accept(ifHasGrades({
            nweaCombined: 48,
            gpa: 2.5
          }))
        },
        {
          filter: everyone,
          fn: accept(ifHasGrades({
            nweaBoth: 24,
            gpa: 2.5
          }))
        }
      )
  },
  "088b58e311956497fd258337fa3d5fe5": {
    "id": "088b58e311956497fd258337fa3d5fe5",
    "programs": [
      "LINCOLN PARK HS: Music - Instrumental",
      "LINCOLN PARK HS: Music - Vocal"
    ],
    "desc": "Students who live within the school's attendance boundary have no eligibility requirements.Students who live outside of the school's attendance boundary:General Education and 504 Plan students: Minimum percentile of 60 in both reading and math on NWEA MAP and minimum 2.75 GPA in 7th grade.IEP and EL students: Minimum combined percentile of 120 in reading and math on NWEA MAP and minimum 2.75 GPA in 7th grade.An audition is required for students who live outside of the school's attendance boundary.",
      "fn": conditional(
        {
          filter: ifInAttendBound,
          fn: accept(everyone)
        },
        {
          filter: ifIEPorEL,
          fn: accept(ifHasGrades({
            nweaCombined: 120,
            gpa: 2.75
          }))
        },
        {
          filter: everyone,
          fn: accept(ifHasGrades({
            nweaBoth: 60,
            gpa: 2.75
          }))
        }
      )
  },
  "9a6bf0e205fc2b15e08cb49fae306c75": {
    "id": "9a6bf0e205fc2b15e08cb49fae306c75",
    "programs": [
      "LINCOLN PARK HS: Music - Instrumental",
      "LINCOLN PARK HS: Music - Vocal"
    ],
    "desc": "Students who live within the school's attendance boundary have no eligibility/audition requirements and can be admitted automatically.Eligible students who live outside of the school's attendance boundary are selected on a point system. Points are based on the student's NWEA MAP scores in reading and math, 7th grade GPA, and the audition.",
      "fn": conditional(
        {
          filter: ifInAttendBound,
          fn: accept(everyone)
        },
        {
          filter: everyone,
          fn:  notImplemented
        }
      )
  },
  "0436f722d2dba3fe9bae154291a02b6d": {
    "id": "0436f722d2dba3fe9bae154291a02b6d",
    "programs": [
      "WELLS HS: General Education"
    ],
    "desc": "Students who live within the school's attendance boundary have no eligibility requirements.Students who live outside of the school's attendance boundary:General Education and 504 Plan students: Minimum percentile of 60 in both reading and math on NWEA MAP, minimum 3.0 GPA in 7th grade, and 7th grade minimum attendance percentage of 95.IEP and EL students have no eligibility requirements.",
      "fn": conditional(
        {
          filter: ifInAttendBound,
          fn: accept(everyone)
        },
        {
          filter: ifIEPorEL,
          fn: accept(everyone)
        },
        {
          filter: everyone,
          fn: accept(ifHasGrades({
            nweaBoth: 60,
            gpa: 3.0,
            attendance: 95
          }))
        }
      )
  },
  "ee858dffde5362e1486d3420f15ea72c": {
    "id": "ee858dffde5362e1486d3420f15ea72c",
    "programs": [
      "WELLS HS: General Education"
    ],
    "desc": "Students who live within the school's attendance boundary have no eligibility requirements and can be admitted automatically.Eligible students who live outside of the school's attendance boundary are randomly selected by computerized lottery. The lottery is conducted in the following order: students scoring above designated NWEA MAP percentile, sibling, general.",
        // FIXME: what designated NWEA MAP Percentile?
      "fn": conditional(
        {
          filter: ifInAttendBound,
          fn: accept(everyone)
        },
        {
          filter: everyone,
          fn: lottery(
            SIBLING_LOTTERY_STAGE,
            GENERAL_LOTTERY_STAGE
          )
        }
      )
  },
  "008a4500cad9fe736b957742a53eff81": {
    "id": "008a4500cad9fe736b957742a53eff81",
    "programs": [
      "HUBBARD HS: International Baccalaureate (IB)"
    ],
    "desc": "General Education and 504 Plan students: Minimum percentile of 24 in both reading and math on NWEA MAP and minimum 2.5 GPA in 7th grade.IEP and EL students: Minimum combined percentile of 48 in reading and math on NWEA MAP and minimum 2.5 GPA in 7th grade.Attendance is required at an Information Session for all eliglble applicants.",
      "fn": conditional(
        {
          filter: ifIEPorEL,
          fn: accept(ifHasGrades({
            nweaCombined: 48,
            gpa: 2.5
          }))
        },
        {
          filter: everyone,
          fn: accept(ifHasGrades({
            nweaBoth: 24,
            gpa: 2.5
          }))
        }
      )
  },
  "c98a49ac4bd7a68cfb25438b29d025df": {
    "id": "c98a49ac4bd7a68cfb25438b29d025df",
    "programs": [
      "HUBBARD HS: University Scholars"
    ],
    "desc": "General Education and 504 Plan students: Minimum percentile of 24 in both reading on math on NWEA MAP, minimum 2.5 GPA in 7th grade, and 7th grade minimum attendance percentage of 90.IEP and EL students: Minimum combined percentile of 48 in reading and math on NWEA MAP, minimum 2.5 GPA in 7th grade, and 7th grade minimum attendance percentage of 90.",
      "fn": conditional(
        {
          filter: ifIEPorEL,
          fn: accept(ifHasGrades({
            nweaCombined: 48,
            gpa: 2.5,
            attendance: 90
          }))
        },
        {
          filter: everyone,
          fn: accept(ifHasGrades({
            nweaBoth: 24,
            gpa: 2.5,
            attendance: 90
          }))
        }
      )
  },
  "4993478e646debe0c8efaf8653ef3baf": {
    "id": "4993478e646debe0c8efaf8653ef3baf",
    "programs": [
      "HUBBARD HS: University Scholars"
    ],
    "desc": "Eligible students are selected on a point system. Points are based on NWEA MAP scores and 7th grade GPA. The school determines the minimum cutoff score for selections.",
    "fn": notImplemented
  },
  "62e38eb28f44e8041fc16850d0beb0ba": {
    "id": "62e38eb28f44e8041fc16850d0beb0ba",
    "programs": [
      "KENWOOD HS: General Education"
    ],
    "desc": "Students currently enrolled in the school's Academic Center will have a deadline to submit their intent to enroll in ninth grade if they wish to enroll in the school's general education program.Students who live within the school's attendance boundary can be admitted automatically.This program only accepts students who live within the school's attendance boundary or who are enrolled in the school's Academic Center.",
      "fn": accept(
        either(
          ifInAttendBound, 
          ifStudentAttendsOneOf(KENWOOD_ACADEMIC_CENTER_PROGRAM)
        )
      )
  },
  "9509f556b27eaab0224329cf49ba04f3": {
    "id": "9509f556b27eaab0224329cf49ba04f3",
    "programs": [
      "KENWOOD HS: Honors"
    ],
    "desc": "General Education and 504 Plan students: Minimum percentile of 75 in both reading and math on NWEA MAP, minimum 3.5 GPA in 7th grade, and 7th grade minimum attendance percentage of 95.IEP and EL students: Minimum combined percentile of 150 in reading and math on NWEA MAP, minimum 3.5 GPA in 7th grade, and 7th grade minimum attendance percentage of 95.",
      "fn": conditional(
        {
          filter: ifIEPorEL,
          fn: accept(ifHasGrades({
            nweaCombined: 150,
            gpa: 3.5,
            attendance: 95
          }))
        },
        {
          filter: everyone,
          fn: accept(ifHasGrades({
            nweaBoth: 75,
            gpa: 3.5,
            attendance: 95
          }))
        }
      )
  },
  "e30c46bef170a78818b6fb771b4fbe66": {
    "id": "e30c46bef170a78818b6fb771b4fbe66",
    "programs": [
      "KENWOOD HS: Magnet Program"
    ],
    "desc": "General Education and 504 Plan students: Minimum percentile of 60 in both reading and math on NWEA MAP, minimum 3.0 GPA in 7th grade, and 7th grade minimum attendance percentage of 95.IEP and EL students: Minimum combined percentile of 160 in reading and math on NWEA MAP, minimum 3.0 GPA in 7th grade, and 7th grade minimum attendance percentage of 95.",
      "fn": conditional(
        {
          filter: ifIEPorEL,
          fn: accept(ifHasGrades({
            nweaCombined: 160,
            gpa: 3.0,
            attendance: 95
          }))
        },
        {
          filter: everyone,
          fn: accept(ifHasGrades({
            nweaBoth: 60,
            gpa: 3.0,
            attendance: 95
          }))
        }
      )
  },
  "87db4e18b51d7b1bd4fcd5968130a830": {
    "id": "87db4e18b51d7b1bd4fcd5968130a830",
    "programs": [
      "KENWOOD HS: Magnet Program"
    ],
    "desc": "Eligible sudents are randomly selected by computerized lottery. The lottery is conducted in the following order: students currently enrolled in the Kenwood Academic Center, general.",
      "fn": lottery(
        {
          filter: ifStudentAttendsOneOf(KENWOOD_ACADEMIC_CENTER_PROGRAM),
          size: LotteryStageSize.SMALL
        },
        GENERAL_LOTTERY_STAGE
      )
  },
  "d0672ee42c09b7d4d4db5b835ff8595d": {
    "id": "d0672ee42c09b7d4d4db5b835ff8595d",
    "programs": [
      "NORTHSIDE PREP HS: Selective Enrollment High School"
    ],
    "desc": "General Education and 504 Plan students: Minimum percentile of 24 in both reading and math on NWEA MAP. IEP and EL students: Minimum combined percentile of 48 in reading and math on NWEA MAP.Testing is required for all eligible applicants.",
      "fn": conditional(
        {
          filter: ifIEPorEL,
          fn: accept(ifHasGrades({
            nweaCombined: 48,
          }))
        },
        {
          filter: everyone,
          fn: accept(ifHasGrades({
            nweaBoth: 24,
          }))
        }
      )
  },
  "3f2a9b5205159da71a0f8a30c8e04642": {
    "id": "3f2a9b5205159da71a0f8a30c8e04642",
    "programs": [
      "CHICAGO MILITARY HS: Service Learning (Military)",
      "CARVER MILITARY HS: Service Learning (Military)",
      "MARINE LEADERSHIP AT AMES HS: Service Learning Academy (Military)",
      "PHOENIX MILITARY HS: Service Learning (Military)",
      "RICKOVER MILITARY HS: Service Learning (Military)",
      "AIR FORCE HS: Service Learning (Military)"
    ],
    "desc": "All applicants: Minimum combined percentile of 48 in reading and math on NWEA MAP.Attendance at an Information Session is required for eligible applicants.",
      "fn": accept(ifHasGrades({
        nweaCombined: 48,
      }))
  },
  "22dce5fef9883bc60380b6114993632a": {
    "id": "22dce5fef9883bc60380b6114993632a",
    "programs": [
      "CHICAGO MILITARY HS: Service Learning (Military)",
      "CARVER MILITARY HS: Service Learning (Military)",
      "PHOENIX MILITARY HS: Service Learning (Military)",
      "RICKOVER MILITARY HS: Service Learning (Military)",
      "AIR FORCE HS: Service Learning (Military)"
    ],
    "desc": "Eligible students must attend an Information Session, during which they will sign a Commitment Agreement, complete a Motivation and Perseverance Assessment and write a brief essay. Selections will be based on a point system with a maximum of 500 points, derived from 7th grade final (cumulative) grades (100 points), 7th grade NWEA MAP scores (150 points), the two-part assessment (50 for each part), and the essay (100 points).",
    "fn": notImplemented
  },
  "9228979a1310a690e2b185c4984b87a7": {
    "id": "9228979a1310a690e2b185c4984b87a7",
    "programs": [
      "CURIE HS: International Baccalaureate (IB)"
    ],
    "desc": "Eligible students are selected on a point system. Points are based on NWEA MAP scores and 7th grade GPA. Students who live within the school's attendance boundary will be given 50 additional points. The school determines the minimum cutoff score for selections.  Preference is given to students who meet the minimum eligibilty requirements, attend an Information Session, and are enrolled in the school’s Middle Years Programme partner, Edwards Elementary School.",
    "fn": ibPointSystem
  },
  "66fee04c701c66e7f3005d9f501d7a5c": {
    "id": "66fee04c701c66e7f3005d9f501d7a5c",
    "programs": [
      "CURIE HS: Visual Arts"
    ],
    "desc": "General Education and 504 Plan students: Minimum percentile of 24 in both reading and math on NWEA MAP.IEP and EL students: Minimum combined percentile of 48 in reading and math on NWEA MAP. All eligible applicants must participate in a portfolio review.",
      "fn": conditional(
        {
          filter: ifIEPorEL,
          fn: accept(ifHasGrades({
            nweaCombined: 48,
          }))
        },
        {
          filter: everyone,
          fn: accept(ifHasGrades({
            nweaBoth: 24,
          }))
        }
      )
  },
  "6ee5613270162186b60088d0d4b11cfb": {
    "id": "6ee5613270162186b60088d0d4b11cfb",
    "programs": [
      "CURIE HS: Visual Arts"
    ],
    "desc": "Eliglble students are selected on a point system. Points are based on the student's NWEA MAP scores in reading and math, 7th grade final (cumulative) grades, and the audition.",
    "fn": notImplemented
  },
  "390d92bc8ab25779c792bdb26c30d580": {
    "id": "390d92bc8ab25779c792bdb26c30d580",
    "programs": [
      "CLEMENTE HS: General Education"
    ],
    "desc": "Students who live within the school's attendance boundary have no eligibility requirements.All applicants who live outside of the school's attendance boundary: Minimum GPA of 2.5 in 7th grade and 7th grade minimum attendance percentage of 85.",
      "fn": conditional(
        {
          filter: ifInAttendBound,
          fn: accept(everyone)
        },
        {
          filter: everyone,
          fn: accept(ifHasGrades({
            gpa: 2.5,
            attendance: 85
          }))
        }
      )
  },
  "5d9d249d090ed48839ac6157459a4646": {
    "id": "5d9d249d090ed48839ac6157459a4646",
    "programs": [
      "CORLISS HS: Early College STEM"
    ],
    "desc": "Students who live within the school's attendance boundary can be admitted automatically.Students who live outside of the schools attendance boundary are randomly selected by computerized lottery. The lottery is conducted in the following order: sibling, general.",
      "fn": conditional(
        {
          filter: ifInAttendBound,
          fn: accept(everyone)
        },
        {
          filter: everyone,
          fn: lottery(
            SIBLING_LOTTERY_STAGE,
            GENERAL_LOTTERY_STAGE
          )
        }
      )
  },
  "25320ed803230a54cb5890b440bc91f5": {
    "id": "25320ed803230a54cb5890b440bc91f5",
    "programs": [
      "JUAREZ HS: General Education"
    ],
    "desc": "Students who live within the school's attendance boundary can be admitted automatically.Students who live outside of the school's attendance boundary will be randomly selected by computerized lottery. The lottery will be conducted in the following order: sibling, general.",
      "fn": conditional(
        {
          filter: ifInAttendBound,
          fn: accept(everyone)
        },
        {
          filter: everyone,
          fn: lottery(
            SIBLING_LOTTERY_STAGE,
            GENERAL_LOTTERY_STAGE
          )
        }
      )
  },
  "f743bb47a2e39c13b90bcca6a3bd50ab": {
    "id": "f743bb47a2e39c13b90bcca6a3bd50ab",
    "programs": [
      "MARINE LEADERSHIP AT AMES HS: Service Learning (Military)"
    ],
    "desc": "Attendance at an Information Session is required for all applicants.",
    "fn": accept(everyone)
  },
  "b744e4bc2f8ede24755ee6de519a513b": {
    "id": "b744e4bc2f8ede24755ee6de519a513b",
    "programs": [
      "MARINE LEADERSHIP AT AMES HS: Service Learning (Military)"
    ],
    "desc": "Students must attend an Information Session, during which they will sign a Commitment Agreement, complete a Motivation and Perseverance Assessment and write a brief essay. Selections will be based on a point system.",
    "fn": notImplemented
  },
  "77f74cdffb6e76cedc987431fee290a9": {
    "id": "77f74cdffb6e76cedc987431fee290a9",
    "programs": [
      "MARINE LEADERSHIP AT AMES HS: Service Learning Academy (Military)"
    ],
    "desc": "Students currently enrolled in the school's eighth grade will have a deadline to submit their intent to enroll in ninth grade if they wish to remain at the school.Eligible students who are not currently enrolled in the school must attend an Information Session, during which they will sign a Commitment Agreement, complete a Motivation and Perseverance Assessment and write a brief essay. Selections will be based on a point system with a maximum of 500 points, derived from 7th grade final (cumulative) grades (100 points), 7th grade NWEA MAP scores (150 points), the two-part assessment (50 for each part), and the essay (100 points).",
      // FIXME AMES HS has a 7th-8th grade program as well. Not sure how to represent it.
      /*
      "fn": conditional(
        {
          filter: ifStudentAttendsOneOf(MARINE_LEADERSHIP_AT_AMES_ES_PROGRAM),
          fn: accept(everyone)
        },
        {
          filter: everyone,
          fn: notImplemented
        }
      )
       */
      "fn": notImplemented
  },
  "886a33612cc92e2d918b95c729be91f5": {
    "id": "886a33612cc92e2d918b95c729be91f5",
    "programs": [
      "CHICAGO ACADEMY HS: General Education"
    ],
    "desc": "General Education and 504 Plan students: Minimum percentile of 25 in both reading and math on NWEA MAP, and 7th grade minimum attendance percentage of 85.IEP and EL students: Minimum combined percentile of 50 in reading and math on NWEA MAP, and 7th grade minimum attendance percentage of 85.",
      "fn": conditional(
        {
          filter: ifIEPorEL,
          fn: accept(ifHasGrades({
            nweaCombined: 50,
            attendance: 85
          }))
        },
        {
          filter: everyone,
          fn: accept(ifHasGrades({
            nweaBoth: 25,
            attendance: 85
          }))
        }
      )
  },
  "34da4ccf238e86275ded50b7ecb29357": {
    "id": "34da4ccf238e86275ded50b7ecb29357",
    "programs": [
      "CHICAGO ACADEMY HS: General Education",
      "SOLORIO HS: Double Honors/Scholars"
    ],
    "desc": "Eligible students are randomly selected by computerized lottery. The lottery is conducted in the following order: sibling, proximity, students enrolled in AUSL schools, general.",
      "fn": lottery(
        SIBLING_LOTTERY_STAGE,
        PROXIMITY_LOTTERY_STAGE,
        {
          filter: ifStudentAttendsOneOf(...AUSL_ES_PROGRAMS),
          size: LotteryStageSize.LARGE
        },
        GENERAL_LOTTERY_STAGE
      )
  },
  "6a05db9fd142fc9b46e16c608376af27": {
    "id": "6a05db9fd142fc9b46e16c608376af27",
    "programs": [
      "CHICAGO ACADEMY HS: Scholars"
    ],
    "desc": "General Education and 504 Plan students: Minimum percentile of 70 in both reading and math on NWEA MAP, minimum 3.0 GPA in 7th grade, and 7th grade minimum attendance percentage of 93.IEP and EL students: Minimum combined percentile of 140 in reading and math on NWEA MAP, minimum 3.0 GPA in 7th grade, and 7th grade minimum attendance percentage of 93.",
      "fn": conditional(
        {
          filter: ifIEPorEL,
          fn: accept(ifHasGrades({
            nweaCombined: 140,
            gpa: 3.0,
            attendance: 93
          }))
        },
        {
          filter: everyone,
          fn: accept(ifHasGrades({
            nweaBoth: 70,
            gpa: 3.0,
            attendance: 93
          }))
        }
      )
  },
  "26dd2726801c47bc0f19541e3b8e8d40": {
    "id": "26dd2726801c47bc0f19541e3b8e8d40",
    "programs": [
      "WILLIAMS HS: General Education"
    ],
    "desc": "General Education and 504 Plan students: Minimum percentile of 24 in both reading and math on NWEA MAP and 7th grade minimum attendance percentage of 85.IEP and EL students: Minimum combined percentile of 48 in reading and math on NWEA MAP, and 7th grade minimum attendance percentage of 85.",
      "fn": conditional(
        {
          filter: ifIEPorEL,
          fn: accept(ifHasGrades({
            nweaCombined: 48,
            attendance: 85
          }))
        },
        {
          filter: everyone,
          fn: accept(ifHasGrades({
            nweaBoth: 24,
            attendance: 85
          }))
        }
      )
  },
  "3779bffcce018fc1fd8fad66dff192e8": {
    "id": "3779bffcce018fc1fd8fad66dff192e8",
    "programs": [
      "WILLIAMS HS: General Education"
    ],
    "desc": "Eligible students are randomly selected by computerized lottery. The lottery is conducted in the following order: sibling, proximity, general.",
      "fn": lottery(
        SIBLING_LOTTERY_STAGE,
        PROXIMITY_LOTTERY_STAGE,
        GENERAL_LOTTERY_STAGE
      )
  },
  "fa79a922866b203c8d6496d161df9030": {
    "id": "fa79a922866b203c8d6496d161df9030",
    "programs": [
      "BRONZEVILLE HS: Honors"
    ],
    "desc": "General Education and 504 Plan students: Minimum percentile of 50 in both reading and math on NWEA MAP, minimum 2.5 GPA in 7th grade.  IEP and EL students: Minimum combined percentile of 100 in reading and math on NWEA MAP and minimum 2.5 GPA in 7th grade.",
      "fn": conditional(
        {
          filter: ifIEPorEL,
          fn: accept(ifHasGrades({
            nweaCombined: 100,
            gpa: 2.5
          }))
        },
        {
          filter: everyone,
          fn: accept(ifHasGrades({
            nweaBoth: 50,
            gpa: 2.5
          }))
        }
      )
  },
  "0bc929592889c06bd7fc9fc7c896c996": {
    "id": "0bc929592889c06bd7fc9fc7c896c996",
    "programs": [
      "SOCIAL JUSTICE HS: General Education"
    ],
    "desc": "Students who live within the school's attendance boundary have no eligibility requirements.Students who live outside of the school's attendance boundary: Essay",
      "fn": conditional(
        {
          filter: ifInAttendBound,
          fn: accept(everyone)
        },
        {
          filter: everyone,
          fn: accept(everyone)
        }
      )
  },
  "dbe4b37a5c43ce0d39d60a77be4dce06": {
    "id": "dbe4b37a5c43ce0d39d60a77be4dce06",
    "programs": [
      "SOCIAL JUSTICE HS: General Education"
    ],
    "desc": "Students who live within the school's attendance boundary have no eligibility requirements and can be admitted automatically.Eligible students who live outside of the school's attendance boundary are selected on a point system. The points are based on the student essay and NWEA MAP scores.",
      "fn": conditional(
        {
          filter: ifInAttendBound,
          fn: accept(everyone)
        },
        {
          filter: everyone,
          fn: notImplemented
        }
      )
  },
  "c222cd82624c337d0c6c3f53bdd71141": {
    "id": "c222cd82624c337d0c6c3f53bdd71141",
    "programs": [
      "MULTICULTURAL HS: Fine & Performing Arts"
    ],
    "desc": "Students who live within the school's attendance boundary have no eligibility requirements.All applicants who live outside of the school's attendance boundary: Minimum 7th grade attendance percentage of 92.",
      "fn": conditional(
        {
          filter: ifInAttendBound,
          fn: accept(everyone)
        },
        {
          filter: everyone,
          fn: accept(ifHasGrades({
            attendance: 92
          }))
        }
      )
  },
  "053dc73702877a040ed0c490255358b1": {
    "id": "053dc73702877a040ed0c490255358b1",
    "programs": [
      "WORLD LANGUAGE HS: General Education"
    ],
    "desc": "Students who live within the school's attendance boundary have no eligibility requirements.Students who live outside of the school's attendance boundary: Minimum 7th grade attendance percentage of 95.",
      "fn": conditional(
        {
          filter: ifInAttendBound,
          fn: accept(everyone)
        },
        {
          filter: everyone,
          fn: accept(ifHasGrades({
            attendance: 92
          }))
        }
      )
  },
  "c26c3c732a905008df6d5d0fdba5391f": {
    "id": "c26c3c732a905008df6d5d0fdba5391f",
    "programs": [
      "DEVRY HS: Dual Enrollment"
    ],
    "desc": "Applicants must be Chicago resident students who have completed required 9th and 10th grade courses, including physical education, by the summer of 2018.Applicants must have a minimum cumulative GPA of 2.5 out of 4.0 and a minimum attendance rate of 90%.Applicants must attend an Information Session with a parent or guardian. Sessions run from November 2017 - February 2018.",
      // FIXME figure out what's going on with '9th and 10th grade courses'
    "fn": notImplemented
  },
  "d040b2d65cb087bbf3fd36a3422c77d8": {
    "id": "d040b2d65cb087bbf3fd36a3422c77d8",
    "programs": [
      "DEVRY HS: Dual Enrollment"
    ],
    "desc": "Attendance at an information session is required. Contact Quitman Dillard at DRecruitment@devry.edu or visit Devry.cps.k12.il.us to schedule attendance at an information session and for additional information about the school’s application and selection processes.",
    "fn": notImplemented
  },
  "94e4bb588b682061839116db3262d874": {
    "id": "94e4bb588b682061839116db3262d874",
    "programs": [
      "COLLINS HS: Gaming"
    ],
    "desc": "Students are randomly selected by computerized lottery. General Education and 504 Pla students: Preference is given to students with percentiles of 24 and above on the NWEA MAP in reading and math. A total of 30% of the seats will be made available to attendance area applicants.IEP and EL students: Preference is given to students with combined NWEA MAP scores that equal 48 or above.Note: Repeating 8th graders and students pushed into 8th grade from 6th grade due to age requirements qualify for selection but will be placed in a lower preference group.",
      // custom req fn -- req fn builders a little ungainly for handling
      // this kind of branching.
      "fn": (s, p) => {
        if( ifSkipped7OrRepeated8(s,p) ) {
          return SuccessChance.UNLIKELY
        } else if ( ifIEPorEL(s,p) ) {
          const passesGrades = ifHasGrades({nweaCombined: 48})(s, p);
          if( passesGrades ) { 
            return SuccessChance.LIKELY;
          } else {
            return SuccessChance.UNCERTAIN;
          }

        } else {
          const passesGrades = ifHasGrades({nweaBoth: 24})(s, p);
          if ( passesGrades ) {
            return SuccessChance.LIKELY;
          } else {
            return SuccessChance.UNCERTAIN;
          }
        }
      }
  },
  "8a98358e9b1886cdbd7e52b22a02c2e9": {
    "id": "8a98358e9b1886cdbd7e52b22a02c2e9",
    "programs": [
      "COLLINS HS: General Education"
    ],
    "desc": "General Education and 504 Plan students: Minimum percentile of 30 in both reading and math on NWEA MAP, minimum 2.0 GPA in 7th grade and 7th grade minimum attendance percentage of 85.IEP and EL students: Minimum combined percentile of 60 in reading and math on NWEA MAP, minimum 2.0 GPA in 7th grade, and 7th grade minimum attendance percentage of 85.",
        "fn": conditional(
          {
            filter: ifIEPorEL,
            fn: accept(ifHasGrades({
              nweaCombined: 60,
              gpa: 2.0,
              attendance: 85
            }))
          },
          {
            filter: everyone,
            fn: accept(ifHasGrades({
              nweaBoth: 30,
              gpa: 2.0,
              attendance: 85
            }))
          }
        )
  },
  "90ccecbb87d12e24c5d2b4a0a417245f": {
    "id": "90ccecbb87d12e24c5d2b4a0a417245f",
    "programs": [
      "COLLINS HS: General Education"
    ],
    "desc": "Eligible students are randomly selected by computerized lottery. The lottery is conducted in the following order: students currently enrolled in Chalmers, Dvorak, Herzl, Johnson, or Morton Elementary Schools; sibling; general.",
      "fn": lottery(
        {
          filter: ifStudentAttendsOneOf(
            CHALMERS_ES_PROGRAM, 
            DVORAK_ES_PROGRAM, 
            HERZL_ES_PROGRAM, 
            JOHNSON_ES_PROGRAM, 
            MORTON_ES_PROGRAM
          ),
          size: LotteryStageSize.LARGE
        },
        SIBLING_LOTTERY_STAGE,
        GENERAL_LOTTERY_STAGE
      )
  },
  "c76e1504e5999bc87571ecb931e54494": {
    "id": "c76e1504e5999bc87571ecb931e54494",
    "programs": [
      "COLLINS HS: Scholars"
    ],
    "desc": "General Education and 504 Plan students: Minimum percentile of 40 in both reading and math on NWEA MAP, minimum 2.8 GPA in 7th grade, and 7th grade minimum attendance percentage of 92.IEP and EL students: Minimum combined percentile of 80 in reading and math on NWEA MAP, minimum 2.8 GPA in 7th grade, and 7th grade minimum attendance percentage of 92.",
        "fn": conditional(
          {
            filter: ifIEPorEL,
            fn: accept(ifHasGrades({
              nweaCombined: 80,
              gpa: 2.8,
              attendance: 92
            }))
          },
          {
            filter: everyone,
            fn: accept(ifHasGrades({
              nweaBoth: 40,
              gpa: 2.8,
              attendance: 92
            }))
          }
        )
  },
  "2e0ef891435ab4fe1bdb8557fdf26f5b": {
    "id": "2e0ef891435ab4fe1bdb8557fdf26f5b",
    "programs": [
      "TEAM HS: General Education"
    ],
    "desc": "General Education and 504 Plan students: Minimum combined percentile of 40 in both reading and math on NWEA MAP, minimum 2.0 GPA in 7th grade, and 7th grade minimum attendance percentage of 80.IEP and EL students: Minimum 2.0 GPA in 7th grade and 7th grade minimum attendance percentage of 80.",
        "fn": conditional(
          {
            filter: ifIEPorEL,
            fn: accept(ifHasGrades({
              attendance: 80,
              gpa: 2.0
            }))
          },
          {
            filter: everyone,
            fn: accept(ifHasGrades({
              nweaCombined: 40,
              gpa: 2.0,
              attendance: 80
            }))
          }
        )
  },
  "e43ffc6a433532188f33251715ee9c30": {
    "id": "e43ffc6a433532188f33251715ee9c30",
    "programs": [
      "TEAM HS: General Education"
    ],
    "desc": "Eligible students are randomly selected by computerized lottery. The lottery is conducted in the following order: students with a 7th grade final GPA of 2.5 or higher, general.",
      "fn": lottery(
        {
          filter: ifHasGrades({
            gpa: 2.5
          }),
          size: LotteryStageSize.LARGE
        },
        GENERAL_LOTTERY_STAGE
      )
  },
  "4040eebeabc71e09f72c645a39052239": {
    "id": "4040eebeabc71e09f72c645a39052239",
    "programs": [
      "OGDEN HS: International Baccalaureate (IB)"
    ],
    "desc": "Students currently enrolled in the school's eighth grade will have a deadline to submit their intent to enroll in ninth grade if they wish to remain at the school.Eligible students who do not attend the school are selected on a point system. Points are based on NWEA MAP scores and 7th grade GPA. Students who live within the school's attendance boundary will be given 50 additional points. The school determines the minimum cutoff score for selections. Preference is given to students who meet the minimum eligibility requirements, attend an Information Session, and are enrolled in the school’s Middle Years Programme partner, Ogden Elementary School.",
      // FIXME what's with the duplicated 'enrolled in school's middle years programme' stuff? Don't those students automaticaly get in?
      "fn": conditional(
        {
          filter: ifStudentAttendsOneOf(OGDEN_ES_PROGRAM),
          fn: accept(everyone)
        },
        {
          filter: everyone,
          fn: ibPointSystem
        }
      )
  },
  "3e37937bfb0c7a06aa6a6fc2446a6b6e": {
    "id": "3e37937bfb0c7a06aa6a6fc2446a6b6e",
    "programs": [
      "SOLORIO HS: Double Honors/Scholars"
    ],
    "desc": "General Education and 504 Plan students: Minimum percentile of 75 in both reading and math on NWEA MAP, minimum 3.0 GPA in 7th grade, and 7th grade minimum attendance percentage of 95.IEP and EL students: Minimum combined percentile of 150 in reading and math on NWEA MAP, minimum 3.0 GPA in 7th grade, and 7th grade minimum attendance percenage of 95.",
        "fn": conditional(
          {
            filter: ifIEPorEL,
            fn: accept(ifHasGrades({
              nweaCombined: 150,
              gpa: 3.0,
              attendance: 95
            }))
          },
          {
            filter: everyone,
            fn: accept(ifHasGrades({
              nweaBoth: 75,
              gpa: 3.0,
              attendance: 95
            }))
          }
        )
  },
  "990c695f3250714f567360a0fa5a0404": {
    "id": "990c695f3250714f567360a0fa5a0404",
    "programs": [
      "BACK OF THE YARDS HS: General Education"
    ],
    "desc": "None. All interested students, including students who live within the overlay boundary of the school, must apply.",
    "fn": accept(everyone)
  },
  "b18dbeb9de2de9ad790ea5aeecb2788f": {
    "id": "b18dbeb9de2de9ad790ea5aeecb2788f",
    "programs": [
      "DISNEY II HS: Fine Arts & Technology"
    ],
    "desc": "Students currently enrolled in the school's eighth grade will have a deadline to submit their intent to enroll in ninth grade if they wish to remain at the school.Eligible students who are not currently enrolled in the school are randomly selected by computerized lottery. The lottery is conducted in the following order: sibling, proximity, tiers.",
      "fn": conditional(
        {
          filter: ifStudentAttendsOneOf(DISNEY_II_ES_PROGRAM),
          fn: accept(everyone)
        },
        {
          filter: everyone,
          fn: lottery(
            SIBLING_LOTTERY_STAGE,
            PROXIMITY_LOTTERY_STAGE,
            TIER_LOTTERY_STAGE
          )
        }
      )
  },
  "bad45006189aeac23e5b2406484da423": {
    "id": "bad45006189aeac23e5b2406484da423",
    "programs": [
      "DYETT ARTS HS: Band",
      "DYETT ARTS HS: Choir",
      "DYETT ARTS HS: Dance",
      "DYETT ARTS HS: Digital Media",
      "DYETT ARTS HS: General Education",
      "DYETT ARTS HS: Theatre",
      "DYETT ARTS HS: Visual Arts"
    ],
    "desc": "Students who live within the school's attendance boundary have no eligibility requirements.Students who live outside of the school's attendance boundary:General Education and 504 Plan students: Minimum percentile of 50 in both reading and math on NWEA MAP, minimum 2.7 GPA in 7th grade, and 7th grade minimum attendance percentage of 90.IEP and EL students: Minimum combined percentile of 80 in reading and math on NWEA MAP and 7th grade minimum attendance percentage of 90.An interview is required for eligible students who live outside of the school's attendance boundary.",
      "fn": conditional(
        {
          filter: ifInAttendBound,
          fn: accept(everyone)
        },
        {
          filter: ifIEPorEL,
          fn: accept(ifHasGrades({
            nweaCombined: 80,
            attendance: 90
          }))
        },
        {
          filter: everyone,
          fn: accept(ifHasGrades({
            nweaBoth: 50,
            gpa: 2.7,
            attendance: 90
          }))
        }
      )
  },
  "cb4e3b8b77fe6ed85674d0f21032de30": {
    "id": "cb4e3b8b77fe6ed85674d0f21032de30",
    "programs": [
      "DYETT ARTS HS: Band",
      "DYETT ARTS HS: Choir",
      "DYETT ARTS HS: Theatre",
      "DYETT ARTS HS: Visual Arts"
    ],
    "desc": "Eligible students are selected on a point system. Points are based on the student's NWEA MAP scores in reading and math and the interview.",
      "fn": notImplemented
  },
  "c13eb6047f521024932c0d43bf2034fc": {
    "id": "c13eb6047f521024932c0d43bf2034fc",
    "programs": [
      "DYETT ARTS HS: Dance",
      "DYETT ARTS HS: Digital Media",
      "DYETT ARTS HS: General Education"
    ],
    "desc": "Eliglble students are selected on a point system. Points are based on the student's NWEA MAP scores in reading and math and the interview.",
      "fn": notImplemented
  },
  "f72557670c93eb046c9a078de4e34860": {
    "id": "f72557670c93eb046c9a078de4e34860",
    "programs": [
      "CHIARTS HS: Creative Writing"
    ],
    "desc": "General Education and 504 Plan students: Minimum percentile of 24 in both reading and math on NWEA MAP and 7th grade minimum attendance percentage of 92.IEP and EL students: Minimum combined percentile of 48 in reading and math on NWEA MAP and 7th grade minimum attendance percentage of 92. A portfolio review is required for all eligible applicants.",
    "fn": ""
  },
  "a311f584960d0e75a9a8f87e62ad2e0a": {
    "id": "a311f584960d0e75a9a8f87e62ad2e0a",
    "programs": [
      "CHIARTS HS: Creative Writing",
      "CHIARTS HS: Visual Arts"
    ],
    "desc": "Eligible students are selected on a point system. Points are based on the portfolio review.",
    "fn": ""
  },
  "a23f50f1a703cefce45dd797efb08647": {
    "id": "a23f50f1a703cefce45dd797efb08647",
    "programs": [
      "CHIARTS HS: Dance",
      "CHIARTS HS: Theatre",
      "CHIARTS HS: Vocal"
    ],
    "desc": "General Education and 504 Plan students: Minimum percentile of 24 in both reading and math on NWEA MAP and 7th grade minimum attendance percentage of 92.IEP and EL students: Minimum combined percentile of 48 in reading and math on NWEA MAP and 7th grade minimum attendance percentage of 92.An audition is required for all eligible applicants.",
    "fn": ""
  },
  "32344ef9871ba4c93b6d9bbc379e1191": {
    "id": "32344ef9871ba4c93b6d9bbc379e1191",
    "programs": [
      "CHIARTS HS: Dance",
      "CHIARTS HS: Instrumental",
      "CHIARTS HS: Musical Theatre",
      "CHIARTS HS: Theatre",
      "CHIARTS HS: Vocal",
      "SCHURZ HS: Chicago Ballet Center"
    ],
    "desc": "Eligible students are selected on a point system. Points are based on the audition.",
    "fn": ""
  },
  "d0370c76606db5a5515ed6f1fa1cb1d8": {
    "id": "d0370c76606db5a5515ed6f1fa1cb1d8",
    "programs": [
      "CHIARTS HS: Instrumental"
    ],
    "desc": "General Education and 504 Plan students: Minimum percentile of 24 in both reading and math on NWEA MAP and 7th grade minimum attendance percentage of 92.IEP and EL students: Minimum combined percentile of 48 in reading and math on NWEA MAP and 7th grade minimum attendance percentage of 92.An audition is required for all eligible applicants, for each of the instruments offered under this program: (1) brass and woodwinds, (2) guitar, (3) percussion, (4) piano, and (5) strings.",
    "fn": ""
  },
  "94c1df0542b0a4c2d0e9927384ad3b05": {
    "id": "94c1df0542b0a4c2d0e9927384ad3b05",
    "programs": [
      "CHIARTS HS: Musical Theatre"
    ],
    "desc": "General Education and 504 Plan students: Minimum percentile of 24 in both reading and math on NWEA MAP and 7th grade minimum attendance percentage of 92.IEP and EL students: Minimum combined percentile of 48 in reading and math on NWEA MAP and 7th grade minimum attendance percentage of 92. An audition is required for all eligible applicants.",
    "fn": ""
  },
  "843ccadbca75f45b37ff772010803746": {
    "id": "843ccadbca75f45b37ff772010803746",
    "programs": [
      "CHIARTS HS: Visual Arts"
    ],
    "desc": "General Education and 504 Plan students: Minimum percentile of 24 in both reading and math on NWEA MAP and 7th grade minimum attendance percentage of 92.IEP and EL students: Minimum combined percentile of 48 in reading and math on NWEA MAP and 7th grade minimum attendance percentage of 92.A portfolio review is required for all eligible applicants.",
    "fn": ""
  },
  "feddb9bba229c6efb66d931e11f22981": {
    "id": "feddb9bba229c6efb66d931e11f22981",
    "programs": [
      "CICS - LONGWOOD: General Education"
    ],
    "desc": "Students currently enrolled in the school's eighth grade will receive an offer.Students who are not currently enrolled in the school are randomly selected by computerized lottery. The lottery is conducted in the following order: students currently enrolled in one of the following CICS schools: Avalon, Basil, Bucktown, Irving Park, Longwood, Prairie, Washington Park, West Belden, or Wrightwood; sibling; general.",
    "fn": ""
  },
  "39c75a9dc53500af65f6fc0cff282f74": {
    "id": "39c75a9dc53500af65f6fc0cff282f74",
    "programs": [
      "CHICAGO MATH & SCIENCE HS: General Education",
      "PERSPECTIVES - JOSLIN HS: General Education",
      "PERSPECTIVES - MATH & SCI HS: STEM",
      "CHICAGO COLLEGIATE: General Education",
      "INTRINSIC HS: General Education",
      "FOUNDATIONS: General Education"
    ],
    "desc": "Students currently enrolled in the school's eighth grade will receive an offer.Students who are not currently enrolled in the school are randomly selected by computerized lottery. The lottery is conducted in the following order: sibling, general.",
    "fn": ""
  },
  "d4186c5b6a1d5e744185d25f75df213e": {
    "id": "d4186c5b6a1d5e744185d25f75df213e",
    "programs": [
      "CHICAGO VIRTUAL: General Education"
    ],
    "desc": "Students currently enrolled in the school's eighth grade will have a guaranteed offer to this program.Students are randomly selected by computerized lottery.",
    "fn": ""
  },
  "a3965fc99a2c9079a31b424b10b96bcd": {
    "id": "a3965fc99a2c9079a31b424b10b96bcd",
    "programs": [
      "NOBLE - COMER: General Education"
    ],
    "desc": "Students currently enrolled in the school's eighth grade will receive an offer.Students who are not currently enrolled in the school are randomly selected by computerized lottery. The lottery is conducted in the following order: sibling, overlay general.",
    "fn": ""
  },
  "01fa691b6b9b9b764d1c2158b23bb0e3": {
    "id": "01fa691b6b9b9b764d1c2158b23bb0e3",
    "programs": [
      "NOBLE - UIC HS: General Education",
      "NOBLE - BULLS HS: General Education",
      "NOBLE - ITW SPEER HS: STEM"
    ],
    "desc": "Students are randomly selected by computerized lottery. The lottery is conducted in the following order: sibling, overlay, general.",
    "fn": ""
  },
  "e8506677ffb5e84bed96682f18ab0908": {
    "id": "e8506677ffb5e84bed96682f18ab0908",
    "programs": [
      "PERSPECTIVES - LEADERSHIP HS: General Education"
    ],
    "desc": "Students currently enrolled in the school's eighth grade will receive an offer.Students who are not currently enrolled in the school are randomly selected by computerized lottery. The lottery is conducted in the following order: sibling, proximity, general.",
    "fn": ""
  },
  "e2c159b65fea9fe9f0d39a504b269d66": {
    "id": "e2c159b65fea9fe9f0d39a504b269d66",
    "programs": [
      "PROSSER HS: Career Academy"
    ],
    "desc": "All applicants must have a minimum GPA of 2.5 in 7th grade and a 7th grade minimum attendance percentage of 90.Attendance at an Information Session is required for all eligible applicants.",
    "fn": ""
  },
  "b039933820a08f1bd24c147f7c433902": {
    "id": "b039933820a08f1bd24c147f7c433902",
    "programs": [
      "PROSSER HS: Career Academy"
    ],
    "desc": "Eligible students are randomly selected by computerized lottery. The lottery is conducted in the following order: staff preference, proximity, general.",
    "fn": ""
  },
  "296feb50cda84ee2a2b91aee32d899df": {
    "id": "296feb50cda84ee2a2b91aee32d899df",
    "programs": [
      "SIMEON HS: Career Academy"
    ],
    "desc": "All applicants: Minimum combined percentile of 30 in reading and math on NWEA MAP, minimum 2.0 GPA in 7th grade, and 7th grade minimum attendance percentage of 85.Eligible students are required to participate in an interview.",
    "fn": ""
  },
  "a03c8d180289e6190797c9e6a94c46d4": {
    "id": "a03c8d180289e6190797c9e6a94c46d4",
    "programs": [
      "AMUNDSEN HS: General Education Grow Community",
      "LAKE VIEW HS: STEM Grow Community"
    ],
    "desc": "Students are randomly selected by computerized lottery. Students who live within the school's attendance boundary can be admitted automatically. Students who attend Grow Community Schools receive preference. This program only accepts students who live within the school's attendance boundary or attend a Grow Community School.",
    "fn": ""
  },
  "976b01cc4c2fe96aae852a0e49e0df4b": {
    "id": "976b01cc4c2fe96aae852a0e49e0df4b",
    "programs": [
      "FARRAGUT HS: General Education"
    ],
    "desc": "Students currently enrolled in the school's eighth grade will receive an offer.Students who live within the school's attendance boundary can be admitted automatically. This program only accepts students who are currently enrolled or who live within the school's attendance boundary.",
    "fn": ""
  },
  "9cb5f9a4f2516816d51cb60f6cad045b": {
    "id": "9cb5f9a4f2516816d51cb60f6cad045b",
    "programs": [
      "FOREMAN HS: Engineering",
      "SOLORIO HS: Engineering"
    ],
    "desc": "Students are selected on a point system. Points are based on 7th grade final GPA and NWEA MAP scores. The school determines the minimum cutoff for selections.",
    "fn": ""
  },
  "038a4f6decd3a070221f3117fcf14c1a": {
    "id": "038a4f6decd3a070221f3117fcf14c1a",
    "programs": [
      "KELLY HS: AVID"
    ],
    "desc": "Students must submit letters of recommendation, write an essay, and participate in an interview.",
    "fn": ""
  },
  "735a935ab565b641776d14ab6c00af28": {
    "id": "735a935ab565b641776d14ab6c00af28",
    "programs": [
      "KELLY HS: General Education",
      "SOLORIO HS: General Education"
    ],
    "desc": "Students who live within the school's attendance boundary can be admitted automatically.Students who live outside of the school's attendance boundary are randomly selected by computerized lottery. The lottery is conducted in the following order: sibling, staff preference, general.",
    "fn": ""
  },
  "9b1b29f9ac4868578c96086e1dfad67f": {
    "id": "9b1b29f9ac4868578c96086e1dfad67f",
    "programs": [
      "KELVYN PARK HS: General Education"
    ],
    "desc": "Students currently enrolled in the school's eighth grade will receive an offer.Students who live within the school's attendance boundary have no eligibility requirements and can be admitted automatically.Eligible students who are not currently enrolled in the school and live outside of the school's attendance boundary are selected on a point system. Points are based on NWEA MAP scores, 7th grade GPA, and the interview.",
    "fn": ""
  },
  "1e77127816b27c9e8238149ef7a8aa96": {
    "id": "1e77127816b27c9e8238149ef7a8aa96",
    "programs": [
      "KELVYN PARK HS: Open Enrollment"
    ],
    "desc": "Students who live within the school's attendance boundary can be enrolled automatically and do not have to apply. Contact the school for registration instructions.Students who live outside of the school's attendance boundary must submit a Choice Elementary Schools application between October and December. Available seats, if any, are filled via computerized lottery. Priority is given to applicants with a sibling who is currently enrolled in the school in grade K-7, and who will remain enrolled in the school for the coming school year.",
    "fn": ""
  },
  "d8b2920353f19f6d9d3fd1d6615c77b7": {
    "id": "d8b2920353f19f6d9d3fd1d6615c77b7",
    "programs": [
      "LAKE VIEW HS: Early College STEM"
    ],
    "desc": "Eligible students are randomly selected by computerized lottery. The lottery is conducted in the following order: sibling, general.",
    "fn": ""
  },
  "89ace67e4d8e89924737f35e5bb2f65a": {
    "id": "89ace67e4d8e89924737f35e5bb2f65a",
    "programs": [
      "LANE TECH HS: Selective Enrollment (Academic Center)",
      "MORGAN PARK HS: Selective Enrollment (Academic Center)",
      "BROOKS HS: Selective Enrollment (Academic Center)",
      "TAFT HS: Selective Enrollment (Academic Center)",
      "KENWOOD HS: Selective Enrollment (Academic Center)",
      "YOUNG HS: Selective Enrollment (Academic Center)",
      "LINDBLOM HS: Selective Enrollment (Academic Center)"
    ],
    "desc": "General Education and 504 Plan students: Minimum percentile of 45 in both reading and math on NWEA MAP.IEP and EL students: Minimum NWEA MAP percentile of 50 in one subject (reading or math) and minimum NWEA MAP percentile of 40 in the other subject (reading or math).Testing is required for all eligible applicants.",
    "fn": ""
  },
  "ae3983f82b8ebbc2b3a5ad8e15a358df": {
    "id": "ae3983f82b8ebbc2b3a5ad8e15a358df",
    "programs": [
      "LANE TECH HS: Selective Enrollment (Academic Center)",
      "MORGAN PARK HS: Selective Enrollment (Academic Center)",
      "BROOKS HS: Selective Enrollment (Academic Center)",
      "TAFT HS: Selective Enrollment (Academic Center)",
      "KENWOOD HS: Selective Enrollment (Academic Center)",
      "LINDBLOM HS: Selective Enrollment (Academic Center)"
    ],
    "desc": "Eligible students are selected on a point system with a maximum of 900 points. Students are assigned points for prior year final grades, NWEA MAP scores, and the admissions test, each worth a maximum of 300 points.",
    "fn": ""
  },
  "46359aa2fe28c190fe45b27ed68ff98c": {
    "id": "46359aa2fe28c190fe45b27ed68ff98c",
    "programs": [
      "LANE TECH HS: Selective Enrollment High School",
      "BROOKS HS: Selective Enrollment High School",
      "YOUNG HS: Selective Enrollment High School",
      "LINDBLOM HS: Selective Enrollment High School"
    ],
    "desc": "Students currently enrolled in the school's Academic Center will receive an offer.Eligible students who are not currently enrolled in the school are selected on a point system with a maximum of 900 points. Students are assigned points for 7th grade final grades, NWEA MAP scores, and the admissions test, each worth a maximum of 300 points. The first 30% of the available seats are filled by the top scoring students based on rank score; the remaining seats are equally distributed among the four socio-economic tiers and filled by the top-scoring students in each tier.",
    "fn": ""
  },
  "b9a9215be3bcd288944a4d48ebdff943": {
    "id": "b9a9215be3bcd288944a4d48ebdff943",
    "programs": [
      "MATHER HS: AVID"
    ],
    "desc": "Eligible students are randomly selected by computerized lottery. The lottery is conducted in the following order: attendance area, general.",
    "fn": ""
  },
  "67dbe7541c75cb9443194c10e79d5f0b": {
    "id": "67dbe7541c75cb9443194c10e79d5f0b",
    "programs": [
      "MORGAN PARK HS: General Education"
    ],
    "desc": "Students currently enrolled in the school's Academic Center will receive an offer.Students who live within the school's attendance boundary can be admitted automatically.Students who live outside of the school's attendance boundary are randomly selected by computerized lottery. The lottery is conducted in the following order: sibling, general.",
    "fn": ""
  },
  "417755e760de6b8e0defee0556fdbd5e": {
    "id": "417755e760de6b8e0defee0556fdbd5e",
    "programs": [
      "ROOSEVELT HS: General Education"
    ],
    "desc": "Students currently enrolled in the school's eighth grade will receive an offer.Students who live within the school's attendance boundary can be admitted automatically.Students who live outside of the school's attendance boundary are randomly selected through computerized lottery. The lottery is conducted in the following order: sibling, staff preference, general.",
    "fn": ""
  },
  "63259afdf1f493797988f8a3bcb370e9": {
    "id": "63259afdf1f493797988f8a3bcb370e9",
    "programs": [
      "ROOSEVELT HS: Open Enrollment"
    ],
    "desc": "Students who live within the school's attendance boundary can be enrolled automatically and do not have to apply. Contact the school for registration instructions.Students who live outside of the school's attendance boundary must submit a Choice Elementary Schools application between October and December. Available seats, if any, are filled via computerized lottery. Priority is given to applicants with a sibling who is currently enrolled in the school in grade 7, and who will remain enrolled in the school for the coming school year.",
    "fn": ""
  },
  "21041cebc1297343d27b2cd0119649e7": {
    "id": "21041cebc1297343d27b2cd0119649e7",
    "programs": [
      "SCHURZ HS: Chicago Ballet Center"
    ],
    "desc": "All applicants: Minimum 3.0 GPA in 7th grade.An audition is required for all eligible applicants.",
    "fn": ""
  },
  "b0eabfd1b29d09fb70642f6891cbd45d": {
    "id": "b0eabfd1b29d09fb70642f6891cbd45d",
    "programs": [
      "SCHURZ HS: Dual Language"
    ],
    "desc": "General Education and 504 Plan students: Minimum percentile of 40 in both reading and math on NWEA MAP, minimum 3.0 GPA in 7th grade.IEP and EL students: Minimum combined percentile of 80 in reading and math on NWEA MAP, minimum 3.0 GPA in 7th grade.",
    "fn": ""
  },
  "b137257a7242a3aea171bf6635060c3b": {
    "id": "b137257a7242a3aea171bf6635060c3b",
    "programs": [
      "STEINMETZ HS: General Education"
    ],
    "desc": "Students who live within the school's attendance boundary have no eligibility requirements.Students who live outside of the school's attendance boundary:General Education and 504 Plan students: Minimum percentile of 20 in both reading and math on NWEA MAP, minimum GPA of 2.0 in 7th grade, and 7th grade minimum attendance percentage of 85.IEP and EL students: Minimum combined percentile of 40 in reading and math on NWEA MAP, minimum GPA of 2.0 in 7th grade, and 7th grade minimum percentage of 85.",
    "fn": ""
  },
  "4d99baeb6f395ef382c7f9b4d4d0665e": {
    "id": "4d99baeb6f395ef382c7f9b4d4d0665e",
    "programs": [
      "STEINMETZ HS: International Baccalaureate (IB)"
    ],
    "desc": "Eligible students are selected on a point system. Points are based on NWEA MAP scores and 7th grade GPA. Students who live within the school's attendance boundary will be given 50 additional points. Preference is given to students who meet the minimum eligibility requirements, attend an Information Session, and are enrolled in the school's Middle Years Programme partner, Locke Elementary School. The school determines the minimum cutoff score for selections.",
    "fn": ""
  },
  "1c3c63b4ea4660af4304c2137d2cca66": {
    "id": "1c3c63b4ea4660af4304c2137d2cca66",
    "programs": [
      "SULLIVAN HS: Newcomers"
    ],
    "desc": "Students who live within the school's attendance boundary can be accepted automatically.Students who live outside of the school's attendance boundary are randomly selected by computerized lottery. The lottery is conducted in the following order: students attending Boone, Field, Gale, Hayt, Jordan, Kilmer, McCutcheon, McPherson, or West Ridge Elementary Schools; sibling; general.",
    "fn": ""
  },
  "41ad51caf930d4a671bc1a62db18dbc5": {
    "id": "41ad51caf930d4a671bc1a62db18dbc5",
    "programs": [
      "TAFT HS: General Education"
    ],
    "desc": "Students currently enrolled in the school's eighth grade will receive an offer.Students enrolled in the Taft Academic Center or students who live within the school's attendance boundary can be admitted automatically.This program only accepts students who live within the school's attendance boundary or who attend the school's Academic Center.",
    "fn": ""
  },
  "7f46c4d6dfe5d0f8dadfd8f657026516": {
    "id": "7f46c4d6dfe5d0f8dadfd8f657026516",
    "programs": [
      "TAFT HS: NJROTC"
    ],
    "desc": "General Education and 504 Plan students: Minimum percentile of 50 in both reading and math on NWEA MAP.IEP and EL students: Minimum combined percentile of 100 in reading and math on NWEA MAP.Eligible applicants must participate in an interview.",
    "fn": ""
  },
  "93eb17c3073fd47dccb5e53d38c2d875": {
    "id": "93eb17c3073fd47dccb5e53d38c2d875",
    "programs": [
      "VON STEUBEN HS: Scholars"
    ],
    "desc": "General Education and 504 Plan students: Minimum percentile of 70 in both reading and math on NWEA MAP and minimum 3.0 GPA in 7th grade.IEP and EL students: Minimum combined percentile of 140 in reading and math on NWEA MAP and minimum 3.0 GPA in 7th grade.Eligible students must submit teacher recommendations and an essay. Online applicants will be prompted to upload their documents via the online application site. Paper applicants should visit www.vonsteuben.org for submission details (click 'Apply' and 'Scholars Program').Applicants who are not eligible will automatically be included in the computerized lottery selection process for the Von Steuben Science Program.",
    "fn": ""
  },
  "0a8552094c8fdf34594f60cb6d3448e9": {
    "id": "0a8552094c8fdf34594f60cb6d3448e9",
    "programs": [
      "LINCOLN PARK HS: Honors/Double Honors"
    ],
    "desc": "Students who live within the school's attendance boundary have no eligibility requirements.Students who live outside of the school's attendance boundary:General Education and 504 Plan students: Minimum percentile of 24 in both reading and math on the NWEA MAP and minimum 2.5 GPA in 7th grade.IEP and 504 Plan students: Minimum combined percentile of 48 in reading and math on NWEA MAP and minimum 2.5 GPA in 7th grade.",
    "fn": ""
  },
  "c7eddadce63ebdc786265f591ccc1bb0": {
    "id": "c7eddadce63ebdc786265f591ccc1bb0",
    "programs": [
      "LINCOLN PARK HS: Instrumental",
      "LINCOLN PARK HS: Vocal"
    ],
    "desc": "Students who live within the school's attendance boundary have no eligibility requirements.Students who live outside of the school's attendance boundary:General Education and 504 Plan students: Minimum percentile of 60 in both reading and math on NWEA MAP and minimum 2.75 GPA in 7th grade.IEP and EL students: Minimum combined percentile of 100 in reading and math on NWEA MAP and minimum 2.75 GPA in 7th grade.An audition is required for students who live outside of the school's attendance boundary.",
    "fn": ""
  },
  "c18af300cd9e5d44b18023d612edef5e": {
    "id": "c18af300cd9e5d44b18023d612edef5e",
    "programs": [
      "LINCOLN PARK HS: Visual Arts"
    ],
    "desc": "General Education and 504 Plan students: Minimum percentile of 60 in both reading and math on NWEA MAP and minimum 2.75 GPA in 7th grade.IEP and EL students: Minimum combined percentile of 120 in reading and math on NWEA MAP and minimum 2.75 GPA in 7th grade.A portfolio review is required for eligible applicants.",
    "fn": ""
  },
  "9f2b0e587c8d4e07e96dd715d0bded3b": {
    "id": "9f2b0e587c8d4e07e96dd715d0bded3b",
    "programs": [
      "LINCOLN PARK HS: Visual Arts"
    ],
    "desc": "Eligible students are selected on a point system. Points are based on the student's NWEA MAP scores in reading and math, 7th grade GPA, and the portfolio review.",
    "fn": ""
  },
  "727f3c50374cfb4fe971e7b4b2ac10a3": {
    "id": "727f3c50374cfb4fe971e7b4b2ac10a3",
    "programs": [
      "WELLS HS: General Education"
    ],
    "desc": "Students who live within the school's attendance boundary have no eligibility requirements.Students who live outside of the school's attendance boundary:General Education and 504 Plan students: Minimum 2.5 GPA in 7th grade, and 7th grade minimum attendance percentage of 90.",
    "fn": ""
  },
  "29787751d9a212e55d88a419dcf5d5cc": {
    "id": "29787751d9a212e55d88a419dcf5d5cc",
    "programs": [
      "WELLS HS: General Education"
    ],
    "desc": "Students who live within the school's attendance boundary have no eligibility requirements and can be admitted automatically.Eligible students who live outside of the school's attendance boundary are randomly selected by computerized lottery. The lottery is conducted in the following order: sibling, staff preference, general.",
    "fn": ""
  },
  "acfda3cdeb08155356c715cdfef7c20d": {
    "id": "acfda3cdeb08155356c715cdfef7c20d",
    "programs": [
      "HUBBARD HS: University Scholars"
    ],
    "desc": "General Education and 504 Plan students: Minimum percentile of 24 in both reading on math on NWEA MAP, minimum 2.5 GPA in 7th grade, and 7th grade minimum attendance percentage of 85.IEP and EL students: Minimum combined percentile of 48 in reading and math on NWEA MAP, minimum 2.5 GPA in 7th grade, and 7th grade minimum attendance percentage of 85.",
    "fn": ""
  },
  "39c0535104720db22d35fe93f1ffcff0": {
    "id": "39c0535104720db22d35fe93f1ffcff0",
    "programs": [
      "KENWOOD HS: General Education"
    ],
    "desc": "Students currently enrolled in the school's Academic Center will receive an  offer.Students who live within the school's attendance boundary can be admitted automatically.This program only accepts students who live within the school's attendance boundary or who are enrolled in the school's Academic Center.",
    "fn": ""
  },
  "ef724d2b79616b996ac8ee00503ab460": {
    "id": "ef724d2b79616b996ac8ee00503ab460",
    "programs": [
      "CHICAGO MILITARY HS: Service Leadership Academy",
      "CARVER MILITARY HS: Service Leadership Academy",
      "MARINE LEADERSHIP AT AMES HS: Service Leadership Academy",
      "PHOENIX MILITARY HS: Service Leadership Academy",
      "RICKOVER MILITARY HS: Service Leadership Academy",
      "AIR FORCE HS: Service Leadership Academy"
    ],
    "desc": "Eligible students must attend an Information Session, during which they will sign a Commitment Agreement, complete a Motivation and Perseverance Assessment and write a brief essay. Selections will be based on a point system with a maximum of 500 points, derived from 7th grade final (cumulative) grades (150 points), 7th grade NWEA MAP scores (150 points), the two-part assessment (50 for each part), and the essay (100 points).",
    "fn": ""
  },
  "a4340aaced08a8b298270ee11fac7ed3": {
    "id": "a4340aaced08a8b298270ee11fac7ed3",
    "programs": [
      "YOUNG HS: Selective Enrollment (Academic Center)"
    ],
    "desc": "Eligible sudents are selected on a point system with a maximum of 900 points. Students are assigned points for prior year final grades, NWEA MAP scores, and the admissions test, each worth a maximum of 300 points.",
    "fn": ""
  },
  "cdfbcbcded156138cadffd0aa3de8065": {
    "id": "cdfbcbcded156138cadffd0aa3de8065",
    "programs": [
      "CURIE HS: AVID"
    ],
    "desc": "General Education and 504 Plan students: Minimum percentile of 50 in both reading and math on NWEA MAP, minimum 2.5 GPA in 7th grade, and 7th grade minimum attendance percentage of 93.IEP and EL students: Minimum combined percentile of 100 in reading and math on NWEA MAP, minimum 2.5 GPA in 7th grade, and 7th grade minimum attendance percentage of 93.",
    "fn": ""
  },
  "c5458f56e94153bb8c850ab81472d9f5": {
    "id": "c5458f56e94153bb8c850ab81472d9f5",
    "programs": [
      "CURIE HS: Dance",
      "CURIE HS: Music"
    ],
    "desc": "General Education and 504 Plan students: Minimum percentile of 20 in both reading and math on NWEA MAP.IEP and EL students: Minimum combined percentile of 40 in reading and math on NWEA MAP.An audition is required for all eligible applicants.",
    "fn": ""
  },
  "f6ddc0ae7fb9f8dc8a73f328f7d00474": {
    "id": "f6ddc0ae7fb9f8dc8a73f328f7d00474",
    "programs": [
      "CURIE HS: Engineering"
    ],
    "desc": "Students are selected on a point system. Points are based on the student's NWEA MAP scores and 7th grade GPA. The school determines the minimum cutoff for selections.",
    "fn": ""
  },
  "a653b55662f2797f775c09849f0f063e": {
    "id": "a653b55662f2797f775c09849f0f063e",
    "programs": [
      "CURIE HS: Visual Arts"
    ],
    "desc": "Eliglble students are selected on a point system. Points are based on the portfolio review.",
    "fn": ""
  },
  "391975c917916b73589bb85808e125f5": {
    "id": "391975c917916b73589bb85808e125f5",
    "programs": [
      "MARINE LEADERSHIP AT AMES HS: Service Leadership Academy (7-8)"
    ],
    "desc": "This school does not have an attendance boundary. Students must submit a Choice Elementary Schools application between October and December. Selections are on a point system, based on the assessment and essay completed at the Information Session.",
    "fn": ""
  },
  "0a03b2757ae82509d51d294a2673faf6": {
    "id": "0a03b2757ae82509d51d294a2673faf6",
    "programs": [
      "CLARK HS: Early College STEM"
    ],
    "desc": "None.  H464",
    "fn": ""
  },
  "a1a1cf6327183b3989eebdaf18dfccf3": {
    "id": "a1a1cf6327183b3989eebdaf18dfccf3",
    "programs": [
      "RABY HS: Broadcast Technology",
      "RABY HS: Culinary Arts",
      "RABY HS: Entrepreneurship"
    ],
    "desc": "Students are randomly selected by computerized lottery. General Education and 504 Plan students: Preference is given to students with percentiles of 24 and above on the NWEA MAP in reading and math.  A total of 30% of the seats will be made available to applicants who live in the school's proximity.IEP and EL students: Preference is given to students with combined NWEA MAP scores that equal 48 or above.Note: Repeating 8th graders and students pushed into 8th grade from 6th grade due to age requirements qualify for selection but will be placed in a lower preference group.",
    "fn": ""
  },
  "baa38e3d8dc9988a0dbfee25ffa264b3": {
    "id": "baa38e3d8dc9988a0dbfee25ffa264b3",
    "programs": [
      "CHICAGO ACADEMY HS: General Education",
      "CHICAGO ACADEMY HS: Scholars"
    ],
    "desc": "Students are randomly selected by computerized lottery. The lottery is conducted in the following order: continuing students, sibling, staff preference, proximity, general.",
    "fn": ""
  },
  "62212fe02d92f9004bbb29f3b92037c9": {
    "id": "62212fe02d92f9004bbb29f3b92037c9",
    "programs": [
      "SOCIAL JUSTICE HS: General Education",
      "MULTICULTURAL HS: Fine & Performing Arts",
      "WORLD LANGUAGE HS: General Education"
    ],
    "desc": "Students who live within the school's attendance boundary can be admitted automatically to the Little Village Lawndale High School campus.Students who live outside of the school's attendance boundary are randomly selected by computerized lottery. The lottery is conducted in the following order: sibling, general.",
    "fn": ""
  },
  "f85eca2619c54c61a3f9a9df4adab773": {
    "id": "f85eca2619c54c61a3f9a9df4adab773",
    "programs": [
      "INFINITY HS: STEM"
    ],
    "desc": "General Education and 504 Plan students: Minimum percentile of 55 in both reading and math on NWEA MAP, minimum 2.0 GPA in 7th grade, and 7th grade minimum attendance percentage of 93.IEP and EL students: Minimum combined percentile of 110 in reading and math on NWEA MAP, minimum 2.0 GPA in 7th grade, and 7th grade minimum attendance percentage of 93.",
    "fn": ""
  },
  "8e31390718d5bef64455c5f48945a1e8": {
    "id": "8e31390718d5bef64455c5f48945a1e8",
    "programs": [
      "INFINITY HS: STEM"
    ],
    "desc": "Eligible students who live within the school's attendance boundary can be admitted automatically to the Little Village Lawndale High School campus.Eligible students who live outside of the school's attendance boundary are randomly selected by computerized lottery. The lottery is conducted in the following order: sibling, general.",
    "fn": ""
  },
  "daafb1f391aa405c7f50921b7e17ecaf": {
    "id": "daafb1f391aa405c7f50921b7e17ecaf",
    "programs": [
      "UPLIFT HS: General Education"
    ],
    "desc": "Students are randomly selected by computerized lottery. The lottery is conducted in the following order: sibling; students who attend Brennemann, Courtenay, Disney, Goudy, Greeley, McCutcheon, or Ravenswood Elementary Schools; general.",
    "fn": ""
  },
  "6f3b345db571ecf2523aa41d336feacc": {
    "id": "6f3b345db571ecf2523aa41d336feacc",
    "programs": [
      "UPLIFT HS: Teaching"
    ],
    "desc": "Students are randomly selected by computerized lottery. General Education and 504 Plan students: Preference is given to students with percentiles of 24 and above on the NWEA MAP in reading and math. A total of 30% of the seats will be made available to applicants who live in the school's proximity.IEP and EL students: Preference is given to students with combined NWEA MAP scores that equal 48 or above.Note: Repeating 8th graders and students pushed into 8th grade from 6th grade due to age requirements qualify for selection but will be placed in a lower preference group.",
    "fn": ""
  },
  "c55294d755cbd1ca052340fe6517693b": {
    "id": "c55294d755cbd1ca052340fe6517693b",
    "programs": [
      "COLLINS HS: Game Programming"
    ],
    "desc": "Students are randomly selected by computerized lottery. General Education and 504 Plan students: Preference is given to students with percentiles of 24 and above on the NWEA MAP in reading and math. A total of 30% of the seats will be made available to applicants who reside within the school's proximity.IEP and EL students: Preference is given to students with combined NWEA MAP scores that equal 48 or above.Note: Repeating 8th graders and students pushed into 8th grade from 6th grade due to age requirements qualify for selection but will be placed in a lower preference group.",
    "fn": ""
  },
  "2220437339d9beb295c4649a227f64cc": {
    "id": "2220437339d9beb295c4649a227f64cc",
    "programs": [
      "OGDEN HS: International Baccalaureate (IB)"
    ],
    "desc": "Students currently enrolled in the school’s eighth grade will have a guaranteed offer to this program.Eligible students who do not attend the school are selected on a point system. Points are based on NWEA MAP scores and 7th grade GPA. Students who live within the school’s overlay boundary will be given 50 additional points. The school determines the minimum cutoff score for selections.",
    "fn": ""
  },
  "a6a877d0bc2ea8f47bd4e414468276f2": {
    "id": "a6a877d0bc2ea8f47bd4e414468276f2",
    "programs": [
      "BACK OF THE YARDS HS: Dual Language"
    ],
    "desc": "General Education and 504 Plan students: Minimum percentile of 40 in both reading and math on NWEA MAP, minimum 3.0 GPA in 7th grade.IEP and EL students: Minimum combined percentile of 80 in reading and math on NWEA MAP, minimum 3.0 GPA in 7th grade.Applicants' primary language must be Spanish.",
    "fn": ""
  },
  "e9046085c529aa64749154c02c8acce4": {
    "id": "e9046085c529aa64749154c02c8acce4",
    "programs": [
      "DISNEY II HS: Fine Arts & Technology"
    ],
    "desc": "Students currently enrolled in the school's eighth grade will receive an offer.Eligible students who are not currently enrolled in the school are randomly selected by computerized lottery. The lottery is conducted in the following order: sibling, proximity, tiers.",
    "fn": ""
  },
  "4c0f7d456bb3bcdcf96b1a2252a3f7b1": {
    "id": "4c0f7d456bb3bcdcf96b1a2252a3f7b1",
    "programs": [
      "DYETT ARTS HS: Band",
      "DYETT ARTS HS: Choir",
      "DYETT ARTS HS: Dance",
      "DYETT ARTS HS: Digital Media",
      "DYETT ARTS HS: General Education",
      "DYETT ARTS HS: Theater",
      "DYETT ARTS HS: Visual Arts"
    ],
    "desc": "Students who live within the school's attendance boundary have no eligibility requirements.Students who live outside of the school's attendance boundary:Minimum percentile of 48 in both reading and math on NWEA MAP, minimum 2.0 GPA in 7th grade, and 7th grade minimum attendance percentage of 90.Completion of a written interview is required for eligible students who live outside of the school's attendance boundary. Applicants must complete form at www.newdyett.org. Paper applicants or applicants without computer access should picke up a copy of the form from the school or call the school to have the form emailed.",
    "fn": ""
  },
  "b9914d57d2b652a3368b71004c4684f1": {
    "id": "b9914d57d2b652a3368b71004c4684f1",
    "programs": [
      "DYETT ARTS HS: Band",
      "DYETT ARTS HS: Choir",
      "DYETT ARTS HS: Dance",
      "DYETT ARTS HS: Digital Media",
      "DYETT ARTS HS: General Education",
      "DYETT ARTS HS: Theater",
      "DYETT ARTS HS: Visual Arts"
    ],
    "desc": "Students who live within the school's attendance boundary have no eligibility requirements and can be admitted automatically.Eligible students are selected on a point system. Points are based on the student's NWEA MAP scores in reading and math and the written interview.",
    "fn": ""
  }
}