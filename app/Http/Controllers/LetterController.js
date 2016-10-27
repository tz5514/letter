'use strict'
const StudentAccountCSIE = use('App/Model/StudentAccountCSIE')
const StudentAccountSE = use('App/Model/StudentAccountSE')
const StudentRecommendationInfoCSIE = use('App/Model/StudentRecommendationInfoCSIE')
const StudentRecommendationInfoSE = use('App/Model/StudentRecommendationInfoSE')
const StudentRecommendationTeacherInfoCSIE = use('App/Model/StudentRecommendationTeacherInfoCSIE')
const StudentRecommendationTeacherInfoSE = use('App/Model/StudentRecommendationTeacherInfoSE')

const Mail = use('Mail')

class LetterController {
  * send (request, response) {
    const { type, account, professor1, professor2 } = request.all();
    const classHash = {
      csie: {
        StudentAccount: StudentAccountCSIE,
        StudentRecommendationInfo: StudentRecommendationInfoCSIE,
        StudentRecommendationTeacherInfo: StudentRecommendationTeacherInfoCSIE
      },
      se: {
        StudentAccount: StudentAccountSE,
        StudentRecommendationInfo: StudentRecommendationInfoSE,
        StudentRecommendationTeacherInfo: StudentRecommendationTeacherInfoSE
      }
    };

    const StudentAccount = classHash[type].StudentAccount;
    const StudentRecommendationInfo = classHash[type].StudentRecommendationInfo;
    const StudentRecommendationTeacherInfo = classHash[type].StudentRecommendationTeacherInfo;

    const student = yield StudentAccount.query().where('S_account', account).first();
    const studentID = student.S_id;
    const studentName = student.S_name;

    const info = yield StudentRecommendationInfo.query().where('S_id', studentID).first();

    let letterList = [];
    const deadline = '2016/10/30';
    const SEtext = (type == 'se') ? ' 軟體工程' : '';

    if (professor1 == info.R_name || professor2 == info.R_name) {
      const letterID = (yield StudentRecommendationTeacherInfo.query().where('S_id', studentID).where('R_index', 1).first()).T_id;
      letterList.push({
        professorName: info.R_name,
        professorMail: info.R_mail,
        studentName,
        letterID,
        deadline,
        type,
        SEtext
      });
    }
    if (professor1 == info.R_name1 || professor2 == info.R_name1) {
      const letterID = (yield StudentRecommendationTeacherInfo.query().where('S_id', studentID).where('R_index', 2).first()).T_id;
      letterList.push({
        professorName: info.R_name1,
        professorMail: info.R_mail1,
        studentName,
        letterID,
        deadline,
        type,
        SEtext
      });
    };

    for (let letter of letterList) {
      yield Mail.send('emails.recommendation', letter, (message) => {
        message.to(letter.professorMail)
        message.from('mrtanakabab@gmail.com', '中央大學 資訊工程學系 - 甄試入學')
        message.subject(`中央大學 資訊工程學系 - 甄試入學電子推薦函邀請信件 - ${letter.professorName}`);
      });
      console.log(`${letter.professorName}: ${letter.professorMail} / ${letter.letterID} 已寄出`);
    }

    response.json(letterList);
  }
}

module.exports = LetterController
