import SuccessChance from "shared/enums/success-chance";

const getCombinedSuccessChance = (application: SuccessChance, selection: SuccessChance): SuccessChance => {
  if (application === SuccessChance.CERTAIN || application === SuccessChance.LIKELY) {
    return selection;
  } else {
    return application;
  }
};

export default getCombinedSuccessChance;
