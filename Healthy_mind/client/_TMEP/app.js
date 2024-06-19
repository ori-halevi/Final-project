// הנתונים של הרופאים
const data = [
  {
    nameDoctor: 'Dr. Eli Navon',
    experienceDoctor: 'Dr. Navon specializes in psychoanalysis and provides counseling for religious communities. He has over 10 years of experience.',
    imgDoctor: '../RESOURCES/Images/Doctors/9-m.jpg',
    idDoctor: '6671b6c22848454301c551ed',
    specialtyDoctor: [ 'Psychoanalyst', 'Religious counselor' ],
    adrressDoctor: 'Ramat Gan',
    languagesDoctor: [ 'Hebrew', 'English' ],
    genderDoctor: 'Male'
  },
  {
    nameDoctor: 'Dr. Dan Amir',
    experienceDoctor: 'Dr. Amir combines genetic counseling with child and adolescent therapy, offering comprehensive care for families.',
    imgDoctor: '../RESOURCES/Images/Doctors/10-m.jpg',
    idDoctor: '6671b6c22848454301c551ee',
    specialtyDoctor: [ 'Genetic counselor', 'Child and adolescent therapist' ],
    adrressDoctor: 'Beersheba',
    languagesDoctor: [ 'Hebrew', 'English', 'Russian' ],
    genderDoctor: 'Male'
  },
  {
    nameDoctor: 'Dr. Yaakov Green',
    experienceDoctor: 'Dr. Green has extensive experience working with children with autism and other developmental disorders, providing both individual and family therapy.',
    imgDoctor: '../RESOURCES/Images/Doctors/11-m.jpg',
    idDoctor: '6671b6c22848454301c551ef',
    specialtyDoctor: [ 'Autism specialist', 'Psychopedagogical therapist' ],
    adrressDoctor: 'Netanya',
    languagesDoctor: [ 'Hebrew', 'English', 'French' ],
    genderDoctor: 'Male'
  },
  {
    nameDoctor: 'Dr. Samuel Cohen',
    experienceDoctor: 'Dr. Cohen specializes in transplant psychiatry and geriatric psychiatry, providing care for elderly patients and those undergoing organ transplants.',
    imgDoctor: '../RESOURCES/Images/Doctors/13-m.jpg',
    idDoctor: '6671b6c22848454301c551f0',
    specialtyDoctor: [ 'Transplant psychiatrist', 'Geriatric psychiatrist' ],
    adrressDoctor: 'Rishon LeZion',
    languagesDoctor: [ 'Hebrew', 'English', 'Russian' ],
    genderDoctor: 'Male'
  },
  {
    nameDoctor: 'Dr. Asher Ben-David',
    experienceDoctor: 'Dr. Ben-David has over 10 years of experience in psychiatric care, specializing in community therapy and mental health support.',
    imgDoctor: '../RESOURCES/Images/Doctors/14-m.png',
    idDoctor: '6671b6c22848454301c551f1',
    specialtyDoctor: [ 'Psychiatrist', 'Community therapist' ],
    adrressDoctor: 'Ashdod',
    languagesDoctor: [ 'Hebrew', 'English', 'French', 'German' ],
    genderDoctor: 'Male'
  },
  {
    nameDoctor: 'Dr. Michael Rosen',
    experienceDoctor: 'Dr. Rosen specializes in trauma therapy, helping patients recover from traumatic events using various therapeutic techniques.',
    imgDoctor: '../RESOURCES/Images/Doctors/15-m.jpg',
    idDoctor: '6671b6c22848454301c551f2',
    specialtyDoctor: [ 'Psychologist', 'Trauma therapist' ],
    adrressDoctor: 'Eilat',
    languagesDoctor: [ 'Hebrew', 'English' ],
    genderDoctor: 'Male'
  },
  {
    nameDoctor: 'Dr. Ron Cohen',
    experienceDoctor: 'Dr. Cohen has over 10 years of experience in psychiatric care, focusing on psychoanalysis and providing comprehensive mental health support.',
    imgDoctor: '../RESOURCES/Images/Doctors/16-m.jpg',
    idDoctor: '6671b6c22848454301c551f3',
    specialtyDoctor: [ 'Psychiatrist', 'Psychoanalyst' ],
    adrressDoctor: 'Tel Aviv',
    languagesDoctor: [ 'Hebrew', 'English', 'Russian' ],
    genderDoctor: 'Male'
  }
];

// הקריטריונים לחיפוש
const criteria = {
  nameDoctor: null,
  specialtyDoctor: 'Psychoanalyst',
  adrressDoctor: null,
  languagesDoctor: 'English',
  genderDoctor: 'Male'
};

function filterDoctors(criteria, data) {
  return data
    .filter(doctor => {
      return Object.keys(criteria).every(key => {
        if (criteria[key] === null) return true;
        if (Array.isArray(doctor[key])) {
          return doctor[key].includes(criteria[key]);
        }
        return criteria[key] === doctor[key];
      });
    })
    .map(doctor => doctor.idDoctor);
}

const result = filterDoctors(criteria, data);
console.log(result); // מדפיס את ה-ID של הרופאים המתאימים
