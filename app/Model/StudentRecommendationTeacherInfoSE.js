'use strict'

const Lucid = use('Lucid')

class StudentRecommendationTeacherInfoSE extends Lucid {
  static get table() {
    return 'student_recomm_teacher_info';
  }

  static get connection () {
    return 'se'
  }
}

module.exports = StudentRecommendationTeacherInfoSE
