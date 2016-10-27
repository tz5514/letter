'use strict'

const Lucid = use('Lucid')

class StudentRecommendationTeacherInfoCSIE extends Lucid {
  static get table() {
    return 'student_recomm_teacher_info';
  }

  static get connection () {
    return 'csie'
  }
}

module.exports = StudentRecommendationTeacherInfoCSIE
