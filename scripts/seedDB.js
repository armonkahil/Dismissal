const mongoose = require('mongoose')
const db = require('../models')
const MONGODB_URI = process.env.MONGODB_URI
const bcrypt = require('bcryptjs')
const gravatar = require('gravatar')
mongoose.Promise = global.Promise
mongoose.set('useNewUrlParser', true)
mongoose.set('useFindAndModify', false)
mongoose.connect(MONGODB_URI, { useNewUrlParser: true, useCreateIndex: true })

const familySeed = [
  {
    familyLastName: 'Kent',
    address: {
      street: '65461 Thackeray Hill',
      city: 'Durham',
      state: 'North Carolina',
      zipCode: '27717'
    },
    emergencyContact:
      'Quisque porta volutpat erat. Quisque erat eros, viverra eget, congue eget, semper rutrum, nulla. Nunc purus.\n\nPhasellus in felis. Donec semper sapien a libero. Nam dui.\n\nProin leo odio, porttitor id, consequat in, consequat ut, nulla. Sed accumsan felis. Ut at dolor quis odio consequat varius.',
    guardians: [
      {
        firstName: 'Clark',
        lastName: 'Kent',
        suffix: '',
        relation: 'Father',
        homePhone: '489-134-3870',
        workPhone: '847-347-8715',
        cellPhone: '441-901-3035',
        email: 'wkemer0@mit.edu'
      },
      {
        firstName: 'Diana',
        lastName: 'Prince',
        suffix: '',
        relation: 'Mother',
        homePhone: '968-480-6905',
        workPhone: '649-946-7546',
        cellPhone: '586-965-1793',
        email: 'ipattinson1@answers.com'
      }
    ],
    students: [
      {
        firstName: 'Cherie',
        middleName: 'Yú',
        lastName: 'Rodenburg',
        suffix: 'Sr',
        gender: 'Female',
        dob: '10/12/2018',
        tShirtSize: 'M',
        gradeLevel: 3,
        disabilities:
          'Aliquam quis turpis eget elit sodales scelerisque. Mauris sit amet eros. Suspendisse accumsan tortor quis turpis.\n\nSed ante. Vivamus tortor. Duis mattis egestas metus.',
        allergies: 'In congue. Etiam justo. Etiam pretium iaculis justo.',
        studentDoctor: 'Leonard McKoy',
        authorizedPickup: []
      },
      {
        firstName: 'Kassey',
        middleName: 'Gisèle',
        lastName: 'Brushfield',
        gender: 'Female',
        dob: '08/15/2016',
        tShirtSize: 'S',
        gradeLevel: 4,
        disabilities:
          'In sagittis dui vel nisl. Duis ac nibh. Fusce lacus purus, aliquet at, feugiat non, pretium quis, lectus.\n\nSuspendisse potenti. In eleifend quam a odio. In hac habitasse platea dictumst.',
        studentDoctor: 'Leonard McKoy',
        authorizedPickup: []
      }
    ],
    familyId: 1
  },
  {
    familyLastName: 'Shade',
    address: {
      street: '71741 Debs Plaza',
      city: 'Charlotte',
      state: 'North Carolina',
      zipCode: '28299'
    },
    emergencyContact:
      'Integer tincidunt ante vel ipsum. Praesent blandit lacinia erat. Vestibulum sed magna at nunc commodo placerat.\n\nPraesent blandit. Nam nulla. Integer pede justo, lacinia eget, tincidunt eget, tempus vel, pede.',
    guardians: [
      {
        firstName: 'Wanda',
        lastName: 'Maximoff',
        suffix: '',
        relation: 'Mother',
        homePhone: '314-702-9752',
        workPhone: '500-245-0489',
        cellPhone: '617-568-2485',
        email: 'jgerran2@meetup.com'
      },
      {
        firstName: 'Victor',
        lastName: 'Shade',
        suffix: 'Sr',
        relation: 'Father',
        homePhone: '335-969-9535',
        workPhone: '493-709-9806',
        cellPhone: '692-662-8320',
        email: 'sgulliford3@linkedin.com'
      }
    ],
    students: [
      {
        firstName: 'Eva',
        middleName: 'Nadège',
        lastName: 'Browell',
        suffix: 'III',
        gender: 'Female',
        dob: '03/19/2018',
        tShirtSize: 'M',
        gradeLevel: 3,
        disabilities:
          'Cras mi pede, malesuada in, imperdiet et, commodo vulputate, justo. In blandit ultrices enim. Lorem ipsum dolor sit amet, consectetuer adipiscing elit.',
        allergies:
          'Morbi non lectus. Aliquam sit amet diam in magna bibendum imperdiet. Nullam orci pede, venenatis non, sodales sed, tincidunt eu, felis.',
        studentDoctor: 'Leonard McKoy',
        authorizedPickup: []
      }
    ],
    familyId: 2
  },
  {
    familyLastName: 'Wayne',
    address: {
      street: '9 Anderson Parkway',
      city: 'Fayetteville',
      state: 'North Carolina',
      zipCode: '28314'
    },
    emergencyContact:
      'Maecenas leo odio, condimentum id, luctus nec, molestie sed, justo. Pellentesque viverra pede ac diam. Cras pellentesque volutpat dui.',
    guardians: [
      {
        firstName: 'Bruce',
        lastName: 'Wayne',
        suffix: '',
        relation: 'Father',
        homePhone: '803-765-8212',
        workPhone: '606-351-3330',
        cellPhone: '153-668-3765',
        email: 'shannum4@dedecms.com',
        students: [],
        family: []
      },
      {
        firstName: 'Selina',
        lastName: 'Kyle',
        suffix: '',
        relation: 'Mother',
        homePhone: '960-638-6498',
        workPhone: '272-726-4357',
        cellPhone: '404-682-2658',
        email: 'jyeudall5@sciencedirect.com',
        students: [],
        family: []
      }
    ],
    students: [
      {
        firstName: 'Damien',
        middleName: 'Eléonore',
        lastName: 'Wayne',
        gender: 'Male',
        dob: '08/05/2019',
        tShirtSize: 'XS',
        gradeLevel: 5,
        disabilities:
          'Aliquam quis turpis eget elit sodales scelerisque. Mauris sit amet eros. Suspendisse accumsan tortor quis turpis.\n\nSed ante. Vivamus tortor. Duis mattis egestas metus.',
        studentDoctor: 'Leonard McKoy'
      }
    ],
    familyId: 3
  },
  {
    familyLastName: 'Richards',
    address: {
      street: '3134 Bluejay Alley',
      city: 'Raleigh',
      state: 'North Carolina',
      zipCode: '27635'
    },
    emergencyContact:
      'Quisque porta volutpat erat. Quisque erat eros, viverra eget, congue eget, semper rutrum, nulla. Nunc purus.\n\nPhasellus in felis. Donec semper sapien a libero. Nam dui.\n\nProin leo odio, porttitor id, consequat in, consequat ut, nulla. Sed accumsan felis. Ut at dolor quis odio consequat varius.',
    guardians: [
      {
        firstName: 'Susan',
        lastName: 'Richards',
        suffix: '',
        relation: 'Mother',
        homePhone: '104-144-7257',
        workPhone: '930-623-4122',
        cellPhone: '596-623-1694',
        email: 'rdenyagin6@addthis.com',
        students: [],
        family: []
      },
      {
        firstName: 'Reed',
        lastName: 'Richards',
        suffix: '',
        relation: 'Father',
        homePhone: '816-578-0704',
        workPhone: '764-273-1927',
        cellPhone: '774-424-9283',
        email: 'prubenchik7@marriott.com',
        students: [],
        family: []
      }
    ],
    students: [
      {
        firstName: 'Tillie',
        middleName: 'Zhì',
        lastName: 'Mills',
        gender: 'Female',
        dob: '07/12/2018',
        tShirtSize: '2XL',
        gradeLevel: 1,
        disabilities:
          'Duis bibendum. Morbi non quam nec dui luctus rutrum. Nulla tellus.\n\nIn sagittis dui vel nisl. Duis ac nibh. Fusce lacus purus, aliquet at, feugiat non, pretium quis, lectus.',
        studentDoctor: 'Leonard McKoy',
        authorizedPickup: []
      }
    ],
    familyId: 4
  },
  {
    familyLastName: 'Parker',
    address: {
      street: '49020 Sachs Point',
      city: 'Raleigh',
      state: 'North Carolina',
      zipCode: '27658'
    },
    emergencyContact:
      'In sagittis dui vel nisl. Duis ac nibh. Fusce lacus purus, aliquet at, feugiat non, pretium quis, lectus.\n\nSuspendisse potenti. In eleifend quam a odio. In hac habitasse platea dictumst.\n\nMaecenas ut massa quis augue luctus tincidunt. Nulla mollis molestie lorem. Quisque ut erat.',
    guardians: [
      {
        firstName: 'Peter',
        lastName: 'Parker',
        suffix: '',
        relation: 'Father',
        homePhone: '632-420-3739',
        workPhone: '325-834-6980',
        cellPhone: '100-877-6077',
        email: 'mashforth8@auda.org.au',
        students: [],
        family: []
      },
      {
        firstName: 'Mary Jane',
        lastName: 'Watson',
        suffix: '',
        relation: 'Mother',
        homePhone: '613-836-9737',
        workPhone: '201-734-9349',
        cellPhone: '189-464-8699',
        email: 'acrepin9@webs.com',
        students: [],
        family: []
      }
    ],
    students: [
      {
        firstName: 'Dana',
        middleName: 'Mén',
        lastName: 'Garnar',
        gender: 'Female',
        dob: '05/02/2019',
        tShirtSize: 'XS',
        gradeLevel: 3,
        disabilities:
          'Aenean fermentum. Donec ut mauris eget massa tempor convallis. Nulla neque libero, convallis eget, eleifend luctus, ultricies eu, nibh.\n\nQuisque id justo sit amet sapien dignissim vestibulum. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Nulla dapibus dolor vel est. Donec odio justo, sollicitudin ut, suscipit a, feugiat et, eros.',
        allergies:
          'Pellentesque at nulla. Suspendisse potenti. Cras in purus eu magna vulputate luctus.\n\nCum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Vivamus vestibulum sagittis sapien. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus.',
        studentDoctor: 'Leonard McKoy',
        authorizedPickup: [
          {
            firstName: 'Bekki',
            middleName: 'Loïca',
            lastName: 'Quinevan',
            gender: 'Female',
            dob: '03/15/2015',
            tShirtSize: 'S',
            gradeLevel: 1,
            disabilities:
              'Cras non velit nec nisi vulputate nonummy. Maecenas tincidunt lacus at velit. Vivamus vel nulla eget eros elementum pellentesque.',
            allergies:
              'Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Vivamus vestibulum sagittis sapien. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus.',
            studentDoctor: 'Leonard McKoy'
          },
          {
            firstName: 'Rheta',
            middleName: 'Maï',
            lastName: 'Rushby',
            gender: 'Female',
            dob: '02/28/2016',
            tShirtSize: '3XL',
            gradeLevel: 4,
            disabilities:
              'Cras mi pede, malesuada in, imperdiet et, commodo vulputate, justo. In blandit ultrices enim. Lorem ipsum dolor sit amet, consectetuer adipiscing elit.',
            studentDoctor: 'Leonard McKoy'
          }
        ]
      }
    ],
    familyId: 5
  },
  {
    familyLastName: 'Allen',
    address: {
      street: '24 Westridge Road',
      city: 'Greensboro',
      state: 'North Carolina',
      zipCode: '27409'
    },
    emergencyContact:
      'Etiam vel augue. Vestibulum rutrum rutrum neque. Aenean auctor gravida sem.',
    guardians: [
      {
        firstName: 'Barry',
        lastName: 'Allen',
        suffix: '',
        relation: 'Father',
        homePhone: '778-301-0261',
        workPhone: '404-820-3657',
        cellPhone: '106-227-7955',
        email: 'delwela@tumblr.com',
        students: [],
        family: []
      },
      {
        firstName: 'Iris',
        lastName: 'West',
        suffix: '',
        relation: 'Female',
        homePhone: '760-939-9815',
        workPhone: '735-912-9137',
        cellPhone: '148-552-0417',
        email: 'glorenzettib@skyrock.com',
        students: [],
        family: []
      }
    ],
    students: [
      {
        firstName: 'Eustace',
        middleName: 'Kévina',
        lastName: 'Hammatt',
        suffix: 'II',
        gender: 'Male',
        dob: '02/26/2017',
        tShirtSize: 'S',
        gradeLevel: 5,
        disabilities: 'Fusce consequat. Nulla nisl. Nunc nisl.',
        studentDoctor: 'Leonard McKoy'
      },
      {
        firstName: 'Dulcie',
        middleName: 'Mélodie',
        lastName: 'Cattrell',
        gender: 'Female',
        dob: '01/22/2014',
        tShirtSize: 'M',
        gradeLevel: 5,
        disabilities:
          'Quisque porta volutpat erat. Quisque erat eros, viverra eget, congue eget, semper rutrum, nulla. Nunc purus.\n\nPhasellus in felis. Donec semper sapien a libero. Nam dui.',
        studentDoctor: 'Leonard McKoy',
        authorizedPickup: []
      }
    ],
    familyId: 6
  },
  {
    familyLastName: 'Lucas',
    address: {
      street: '279 Kim Way',
      city: 'Winston Salem',
      state: 'North Carolina',
      zipCode: '27105'
    },
    emergencyContact:
      'In hac habitasse platea dictumst. Morbi vestibulum, velit id pretium iaculis, diam erat fermentum justo, nec condimentum neque sapien placerat ante. Nulla justo.',
    guardians: [
      {
        firstName: 'Carl',
        lastName: 'Lucas',
        suffix: '',
        relation: 'Male',
        homePhone: '945-649-3723',
        workPhone: '665-782-5934',
        cellPhone: '905-931-6579',
        email: 'cknottc@nhs.uk',
        students: [],
        family: []
      },
      {
        firstName: 'Jessica',
        lastName: 'Jones',
        suffix: '',
        relation: 'Female',
        homePhone: '393-427-7718',
        workPhone: '835-556-0225',
        cellPhone: '232-559-1965',
        email: 'jnorthcottd@google.com',
        students: [],
        family: []
      }
    ],
    students: [
      {
        firstName: 'Falito',
        middleName: 'Erwéi',
        lastName: 'Hullbrook',
        suffix: 'Jr',
        gender: 'Male',
        dob: '09/06/2017',
        tShirtSize: 'XL',
        gradeLevel: 1,
        disabilities:
          'Nulla ut erat id mauris vulputate elementum. Nullam varius. Nulla facilisi.',
        studentDoctor: 'Leonard McKoy',
        authorizedPickup: []
      },
      {
        firstName: 'Hendrik',
        middleName: 'Hélèna',
        lastName: 'Worner',
        gender: 'Male',
        dob: '03/10/2018',
        tShirtSize: '3XL',
        gradeLevel: 5,
        disabilities:
          'Proin interdum mauris non ligula pellentesque ultrices. Phasellus id sapien in sapien iaculis congue. Vivamus metus arcu, adipiscing molestie, hendrerit at, vulputate vitae, nisl.',
        allergies:
          'Curabitur gravida nisi at nibh. In hac habitasse platea dictumst. Aliquam augue quam, sollicitudin vitae, consectetuer eget, rutrum at, lorem.',
        studentDoctor: 'Leonard McKoy'
      },
      {
        firstName: 'Isidora',
        middleName: 'Méthode',
        lastName: 'Dripps',
        gender: 'Female',
        dob: '10/26/2018',
        tShirtSize: '3XL',
        gradeLevel: 5,
        disabilities:
          'Proin eu mi. Nulla ac enim. In tempor, turpis nec euismod scelerisque, quam turpis adipiscing lorem, vitae mattis nibh ligula nec sem.\n\nDuis aliquam convallis nunc. Proin at turpis a pede posuere nonummy. Integer non velit.',
        allergies:
          'Morbi porttitor lorem id ligula. Suspendisse ornare consequat lectus. In est risus, auctor sed, tristique in, tempus sit amet, sem.\n\nFusce consequat. Nulla nisl. Nunc nisl.',
        studentDoctor: 'Leonard McKoy',
        authorizedPickup: []
      }
    ],
    familyId: 7
  },
  {
    familyLastName: 'Fleck',
    address: {
      street: '5 Lawn Point',
      city: 'Wilmington',
      state: 'North Carolina',
      zipCode: '28410'
    },
    emergencyContact:
      'Proin leo odio, porttitor id, consequat in, consequat ut, nulla. Sed accumsan felis. Ut at dolor quis odio consequat varius.\n\nInteger ac leo. Pellentesque ultrices mattis odio. Donec vitae nisi.\n\nNam ultrices, libero non mattis pulvinar, nulla pede ullamcorper augue, a suscipit nulla elit ac nulla. Sed vel enim sit amet nunc viverra dapibus. Nulla suscipit ligula in lacus.',
    guardians: [
      {
        firstName: 'Arthur',
        lastName: 'Fleck',
        suffix: '',
        relation: 'Father',
        homePhone: '777-309-8741',
        workPhone: '416-350-3497',
        cellPhone: '248-177-9457',
        email: 'nhandye@chicagotribune.com',
        students: [],
        family: []
      },
      {
        firstName: 'Harleen',
        lastName: 'Quinzel',
        suffix: '',
        relation: 'Mother',
        homePhone: '240-156-5139',
        workPhone: '624-784-0185',
        cellPhone: '295-367-5130',
        email: 'iborelandf@mtv.com',
        students: [],
        family: []
      }
    ],
    students: [
      {
        firstName: 'Morton',
        middleName: 'Maéna',
        lastName: 'MacDirmid',
        gender: 'Male',
        dob: '01/31/2019',
        tShirtSize: 'XL',
        gradeLevel: 5,
        disabilities:
          'Nam ultrices, libero non mattis pulvinar, nulla pede ullamcorper augue, a suscipit nulla elit ac nulla. Sed vel enim sit amet nunc viverra dapibus. Nulla suscipit ligula in lacus.\n\nCurabitur at ipsum ac tellus semper interdum. Mauris ullamcorper purus sit amet nulla. Quisque arcu libero, rutrum ac, lobortis vel, dapibus at, diam.',
        allergies:
          'Phasellus sit amet erat. Nulla tempus. Vivamus in felis eu sapien cursus vestibulum.',
        studentDoctor: 'Leonard McKoy'
      },
      {
        firstName: 'Panchito',
        middleName: 'Athéna',
        lastName: 'Billyard',
        gender: 'Male',
        dob: '03/24/2016',
        tShirtSize: 'S',
        gradeLevel: 2,
        disabilities:
          'Proin interdum mauris non ligula pellentesque ultrices. Phasellus id sapien in sapien iaculis congue. Vivamus metus arcu, adipiscing molestie, hendrerit at, vulputate vitae, nisl.\n\nAenean lectus. Pellentesque eget nunc. Donec quis orci eget orci vehicula condimentum.',
        studentDoctor: 'Leonard McKoy',
        authorizedPickup: []
      }
    ],
    familyId: 8
  },
  {
    familyLastName: 'Rogers',
    address: {
      street: '047 Veith Avenue',
      city: 'Fayetteville',
      state: 'North Carolina',
      zipCode: '28314'
    },
    emergencyContact:
      'Suspendisse potenti. In eleifend quam a odio. In hac habitasse platea dictumst.\n\nMaecenas ut massa quis augue luctus tincidunt. Nulla mollis molestie lorem. Quisque ut erat.',
    guardians: [
      {
        firstName: 'Steve',
        lastName: 'Rogers',
        suffix: '',
        relation: 'Father',
        homePhone: '578-998-4804',
        workPhone: '329-913-6891',
        cellPhone: '873-263-7829',
        email: 'nduffg@cbsnews.com'
      },
      {
        firstName: 'Sharon',
        lastName: 'Carter',
        suffix: '',
        relation: 'Mother',
        homePhone: '895-448-1475',
        workPhone: '167-455-1684',
        cellPhone: '749-402-9826',
        email: 'jkaiserh@census.gov'
      }
    ],
    students: [
      {
        firstName: 'Lindsay',
        middleName: 'Alizée',
        lastName: 'Peddie',
        suffix: 'Sr',
        gender: 'Male',
        dob: '05/03/2015',
        tShirtSize: 'XL',
        gradeLevel: 1,
        disabilities:
          'Nulla ut erat id mauris vulputate elementum. Nullam varius. Nulla facilisi.',
        allergies:
          'Vestibulum ac est lacinia nisi venenatis tristique. Fusce congue, diam id ornare imperdiet, sapien urna pretium nisl, ut volutpat sapien arcu sed augue. Aliquam erat volutpat.\n\nIn congue. Etiam justo. Etiam pretium iaculis justo.',
        studentDoctor: 'Leonard McKoy',
        authorizedPickup: []
      },
      {
        firstName: 'Ardyce',
        middleName: 'Audréanne',
        lastName: 'Wigmore',
        gender: 'Female',
        dob: '10/29/2017',
        tShirtSize: 'M',
        gradeLevel: 2,
        disabilities:
          'Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Vivamus vestibulum sagittis sapien. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus.\n\nEtiam vel augue. Vestibulum rutrum rutrum neque. Aenean auctor gravida sem.',
        studentDoctor: 'Leonard McKoy',
        authorizedPickup: []
      },
      {
        firstName: 'Luise',
        middleName: 'Dà',
        lastName: 'Mazey',
        gender: 'Female',
        dob: '11/09/2014',
        tShirtSize: '3XL',
        gradeLevel: 4,
        disabilities:
          'Vestibulum quam sapien, varius ut, blandit non, interdum in, ante. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Duis faucibus accumsan odio. Curabitur convallis.',
        studentDoctor: 'Leonard McKoy'
      }
    ],
    familyId: 9
  },
  {
    familyLastName: 'Parr',
    address: {
      street: '377 Bellgrove Trail',
      city: 'Raleigh',
      state: 'North Carolina',
      zipCode: '27615'
    },
    emergencyContact:
      'Morbi non lectus. Aliquam sit amet diam in magna bibendum imperdiet. Nullam orci pede, venenatis non, sodales sed, tincidunt eu, felis.',
    guardians: [
      {
        firstName: 'Robert',
        lastName: 'Parr',
        suffix: '',
        relation: 'Father',
        homePhone: '296-758-3880',
        workPhone: '737-244-5302',
        cellPhone: '821-774-3994',
        email: 'jegentani@gnu.org'
      },
      {
        firstName: 'Helen',
        lastName: 'Parr',
        suffix: '',
        relation: 'Mother',
        homePhone: '679-419-6518',
        workPhone: '562-547-4935',
        cellPhone: '294-383-0579',
        email: 'bhopewellj@hexun.com'
      }
    ],
    students: [
      {
        firstName: 'Kimmy',
        middleName: 'Méline',
        lastName: 'Dusting',
        gender: 'Female',
        dob: '01/02/2016',
        tShirtSize: '2XL',
        gradeLevel: 4,
        disabilities:
          'Morbi porttitor lorem id ligula. Suspendisse ornare consequat lectus. In est risus, auctor sed, tristique in, tempus sit amet, sem.',
        studentDoctor: 'Leonard McKoy',
        authorizedPickup: []
      },
      {
        firstName: 'Hattie',
        middleName: 'Zhì',
        lastName: 'Blaycock',
        gender: 'Female',
        dob: '11/04/2018',
        tShirtSize: '2XL',
        gradeLevel: 2,
        disabilities:
          'Morbi porttitor lorem id ligula. Suspendisse ornare consequat lectus. In est risus, auctor sed, tristique in, tempus sit amet, sem.',
        studentDoctor: 'Leonard McKoy'
      },
      {
        firstName: 'Boot',
        middleName: 'Pål',
        lastName: 'McElwee',
        gender: 'Male',
        dob: '01/07/2020',
        tShirtSize: 'S',
        gradeLevel: 5,
        disabilities:
          'Duis aliquam convallis nunc. Proin at turpis a pede posuere nonummy. Integer non velit.',
        studentDoctor: 'Leonard McKoy'
      }
    ],
    familyId: 10
  }
]
const adminSeed = [
  {
    email: 'joeclark@email.com',
    password: bcrypt.hashSync('password1', 10),
    familyId: 11,
    admin: true,
    avatar: gravatar.url(this.email, {
      s: '200', // Size
      r: 'pg', // Rating
      d: 'mm' // Default
    })
  },
  {
    name: 'Rick Karlolak'
  },
  {
    name: 'Ezmeralda Hamments'
  }
]

const userSeed = [
  {
    email: 'kent@email.com',
    password: bcrypt.hashSync('password10', 10),
    familyId: 1,
    avatar: gravatar.url(this.email, {
      s: '200', // Size
      r: 'pg', // Rating
      d: 'mm' // Default
    })
  },
  {
    email: 'shade@email.com',
    password: bcrypt.hashSync('password9', 10),
    familyId: 2,
    avatar: gravatar.url(this.email, {
      s: '200', // Size
      r: 'pg', // Rating
      d: 'mm' // Default
    })
  },
  {
    email: 'wayne@email.com',
    password: bcrypt.hashSync('password8', 10),
    familyId: 3,
    avatar: gravatar.url(this.email, {
      s: '200', // Size
      r: 'pg', // Rating
      d: 'mm' // Default
    })
  },
  {
    email: 'richards@email.com',
    password: bcrypt.hashSync('password7', 10),
    familyId: 4,
    avatar: gravatar.url(this.email, {
      s: '200', // Size
      r: 'pg', // Rating
      d: 'mm' // Default
    })
  },
  {
    email: 'parker@email.com',
    password: bcrypt.hashSync('password6', 10),
    familyId: 5,
    avatar: gravatar.url(this.email, {
      s: '200', // Size
      r: 'pg', // Rating
      d: 'mm' // Default
    })
  },
  {
    email: 'allen@email.com',
    password: bcrypt.hashSync('password5', 10),
    familyId: 6,
    avatar: gravatar.url(this.email, {
      s: '200', // Size
      r: 'pg', // Rating
      d: 'mm' // Default
    })
  },
  {
    email: 'lucas@email.com',
    password: bcrypt.hashSync('password4', 10),
    familyId: 7,
    avatar: gravatar.url(this.email, {
      s: '200', // Size
      r: 'pg', // Rating
      d: 'mm' // Default
    })
  },
  {
    email: 'fleck@email.com',
    password: bcrypt.hashSync('password3', 10),
    familyId: 8,
    avatar: gravatar.url(this.email, {
      s: '200', // Size
      r: 'pg', // Rating
      d: 'mm' // Default
    })
  },
  {
    email: 'rogers@email.com',
    password: bcrypt.hashSync('password2', 10),
    familyId: 9,
    avatar: gravatar.url(this.email, {
      s: '200', // Size
      r: 'pg', // Rating
      d: 'mm' // Default
    })
  },
  {
    email: 'parr@email.com',
    password: bcrypt.hashSync('password1', 10),
    familyId: 10,
    avatar: gravatar.url(this.email, {
      s: '200', // Size
      r: 'pg', // Rating
      d: 'mm' // Default
    })
  },
  {
    email: 'joeclark@email.com',
    password: bcrypt.hashSync('password0', 10),
    familyId: 11,
    admin: true,
    avatar: gravatar.url(this.email, {
      s: '200', // Size
      r: 'pg', // Rating
      d: 'mm' // Default
    })
  }
]

db.User.remove({})
  .then(() => db.User.collection.insertMany(userSeed))
  .then(data => {
    console.log(data.result.n + ' user records inserted!')
    process.exit(0)
  })
  .catch(err => {
    console.error(err)
    process.exit(1)
  })

db.Family.remove({})
  .then(() => db.Family.collection.insertMany(familySeed))
  .then(data => {
    console.log(data.result.n + ' family records inserted!')
    process.exit(0)
  })
  .catch(err => {
    console.error(err)
    process.exit(1)
  })

db.Admin.remove({})
  .then(() => db.Admin.collection.insertMany(adminSeed))
  .then(data => {
    console.log(data.result.n + ' admin records inserted!')
    process.exit(0)
  })
  .catch(err => {
    console.error(err)
    process.exit(1)
  })
