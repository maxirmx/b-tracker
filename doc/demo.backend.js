// Copyright (C) 2023 Maxim [maxirmx] Samsonov  (www.sw.consulting)
// All rights reserved.
// This file is a part of s-tracker applcation  (test data set)
//
// Redistribution and use in source and binary forms, with or without
// modification, are permitted provided that the following conditions
// are met:
// 1. Redistributions of source code must retain the above copyright
//    notice, this list of conditions and the following disclaimer.
// 2. Redistributions in binary form must reproduce the above copyright
//    notice, this list of conditions and the following disclaimer in the
//    documentation and/or other materials provided with the distribution.
//
// THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS
// ``AS IS'' AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED
// TO, THE IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR
// PURPOSE ARE DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT HOLDERS OR CONTRIBUTORS
// BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR
// CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF
// SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS
// INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER IN
// CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE)
// ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF ADVISED OF THE
// POSSIBILITY OF SUCH DAMAGE.

export { fakeBackend }
import { stcodes } from '@/helpers/statuses.js'

function fakeBackend() {
  let shipments = [
    {
      shipmentNumber: '1034A7',
      location: 'Kuala Lumpur, ML',
      statusCode: stcodes.COLLECTED,
      date: '12.07.2023',
      ddate: '12.08.2023',
      dest: 'Весьегонск, РФ'
    },
    {
      shipmentNumber: '2234A1',
      location: 'Тикси, РФ',
      statusCode: stcodes.REGISTERED,
      date: '14.07.2023',
      ddate: '14.08.2023',
      dest: 'Hanga Roa, CL'
    },
    {
      shipmentNumber: '2274A1',
      location: 'Струги Красные, РФ',
      statusCode: stcodes.IN_STORAGE,
      date: '15.07.2023',
      ddate: '03.08.2023',
      dest: 'Kutaisi, GE'
    },
    {
      shipmentNumber: '2274A4',
      location: 'Лесосибирск, РФ',
      statusCode: stcodes.DELIVERED,
      date: '15.07.2023',
      ddate: '15.07.2023',
      dest: 'Лесосибирск, РФ'
    },
    {
      shipmentNumber: '1234A1',
      location: 'Опочка, РФ',
      statusCode: stcodes.DELIVERED,
      date: '21.07.2023',
      ddate: '21.07.2023',
      dest: 'Опочка, РФ'
    }
  ]

  let  history = [
      { id: 1115, status: stcodes.DELIVERED,        date: '21.07.2023', location: 'Опочка, РФ',         shipmentNumber: '1234A1',  comment: 'В Опочке было весело'                  },
      { id: 1114, status: stcodes.OUT_OF_STORAGE,   date: '21.07.2023', location: 'Псков, РФ',          shipmentNumber: '1234A1',  comment: 'Во Пскове было интересно'              },
      { id: 1112, status: stcodes.IN_STORAGE,       date: '20.07.2023', location: 'Псков, РФ',          shipmentNumber: '1234A1',                                                   },
      { id: 1111, status: stcodes.OUT_OF_STORAGE,   date: '19.07.2023', location: 'Новороссийск, РФ',   shipmentNumber: '1234A1'                                                    },
      { id: 904,  status: stcodes.CUSTOMS_END,      date: '19.07.2023', location: 'Новороссийск, РФ',   shipmentNumber: '1234A1'                                                    },
      { id: 805,  status: stcodes.CUSTOMS_START,    date: '16.07.2023', location: 'Новороссийск, РФ',   shipmentNumber: '1234A1',                                                   },
      { id: 706,  status: stcodes.IN_STORAGE,       date: '16.07.2023', location: 'Новороссийск, РФ',   shipmentNumber: '1234A1', comment: 'В Новороссийске было солнечно'          },
      { id: 607,  status: stcodes.OUT_OF_STORAGE,   date: '14.07.2023', location: 'Newark, US',         shipmentNumber: '1234A1',                                                   },
      { id: 508,  status: stcodes.CUSTOMS_END,      date: '13.07.2023', location: 'Newark, US',         shipmentNumber: '1234A1'                                                    },
      { id: 409,  status: stcodes.CUSTOMS_START,    date: '12.07.2023', location: 'Newark, US',         shipmentNumber: '1234A1'                                                    },
      { id: 310,  status: stcodes.IN_STORAGE,       date: '10.07.2023', location: 'Newark, US',         shipmentNumber: '1234A1', comment: 'В Ньюарке протестовали афроамериканцы'  },
      { id: 211,  status: stcodes.OUT_OF_STORAGE,   date: '10.07.2023', location: 'Buffalo, US',        shipmentNumber: '1234A1'                                                    },
      { id: 112,  status: stcodes.IN_STORAGE,       date: '02.07.2023', location: 'Buffalo, US',        shipmentNumber: '1234A1', comment: 'В Буффало горел лес'                    },
      { id: 14,   status: stcodes.COLLECTED,        date: '01.07.2023', location: 'Montreal, CA',       shipmentNumber: '1234A1', comment: 'В Монреале шёл дождь'                   },
      { id: 11,   status: stcodes.REGISTERED,       date: '01.07.2023', location: 'Montreal, CA',       shipmentNumber: '1234A1'                                                    },

      { id: 1125, status: stcodes.DELIVERED,        date: '15.07.2023', location: 'Лесосибирск, РФ',    shipmentNumber: '2274A4',  comment: 'В Лесосибирске было страшно'           },
      { id: 1121, status: stcodes.OUT_OF_STORAGE,   date: '12.07.2023', location: 'Дудинка, РФ',        shipmentNumber: '2274A4'                                                    },
      { id: 914,  status: stcodes.CUSTOMS_END,      date: '12.07.2023', location: 'Дудинка, РФ',        shipmentNumber: '2274A4'                                                    },
      { id: 815,  status: stcodes.CUSTOMS_START,    date: '09.07.2023', location: 'Дудинка, РФ',        shipmentNumber: '2274A4',                                                   },
      { id: 716,  status: stcodes.IN_STORAGE,       date: '09.07.2023', location: 'Дудинка, РФ',        shipmentNumber: '2274A4', comment: 'В Дудинке было холодно'                 },
      { id: 617,  status: stcodes.OUT_OF_STORAGE,   date: '07.07.2023', location: 'Oslo, NO',           shipmentNumber: '2274A4',                                                   },
      { id: 518,  status: stcodes.CUSTOMS_END,      date: '06.07.2023', location: 'Oslo, NO',           shipmentNumber: '2274A4'                                                    },
      { id: 419,  status: stcodes.CUSTOMS_START,    date: '05.07.2023', location: 'Oslo, NO',           shipmentNumber: '2274A4'                                                    },
      { id: 320,  status: stcodes.IN_STORAGE,       date: '03.07.2023', location: 'Oslo, NO',           shipmentNumber: '2274A4', comment: 'В Осло был туман'                       },
      { id: 24,   status: stcodes.COLLECTED,        date: '22.06.2023', location: 'Malmo, SE',          shipmentNumber: '2274A4', comment: 'Мальмё - дыра дырой'                    },
      { id: 21,   status: stcodes.REGISTERED,       date: '22.06.2023', location: 'Malmo, SE',          shipmentNumber: '2274A4'                                                    },

      { id: 330,  status: stcodes.IN_STORAGE,       date: '03.07.2023', location: 'Псков, РФ',          shipmentNumber: '2274A1', comment: 'Так и лежит две недели ...'             },
      { id: 34,   status: stcodes.COLLECTED,        date: '22.06.2023', location: 'Струги Красные, РФ', shipmentNumber: '2274A1',                                                   },
      { id: 31,   status: stcodes.REGISTERED,       date: '22.06.2023', location: 'Струги Красные, РФ', shipmentNumber: '2274A1', comment: 'Название красивое'                      },

      { id: 41,   status: stcodes.REGISTERED,       date: '14.07.2023', location: 'Тикси, РФ',          shipmentNumber: '2234A1', comment: 'Когда растает снег ...'                 },

      { id: 54,   status: stcodes.COLLECTED,        date: '12.07.2023', location: 'Kuala Lumpur, ML',   shipmentNumber: '1034A7',                                                   },
      { id: 51,   status: stcodes.REGISTERED,       date: '10.07.2023', location: 'Kuala Lumpur, ML',   shipmentNumber: '1034A7', comment: 'Тут убить человека стоит 5 баксов'      },
    ]

  /*let users = [
    {
      id: 0,
      email: 'admin@example.com',
      password: 'admin',
      firstName: 'Иван',
      patronimic: 'Иванович',
      orgId: 0,
      lastName: 'Иванов',
      isAdmin: true,
      isManager: true
    },
    {
      id: 1,
      email: 'manager@example.com',
      password: 'manager',
      firstName: 'Роман',
      patronimic: 'Петрович',
      orgId: 0,
      lastName: 'Ойра-Ойра',
      isAdmin: false,
      isManager: true
    },
    {
      id: 2,
      email: 'user@example.com',
      password: 'user',
      firstName: 'Михаил',
      patronimic: 'Владленович',
      orgId: 1,
      lastName: 'Сидоров',
      isAdmin: false,
      isManager: false
    },
    {
      id: 3,
      email: 'individual@example.com',
      password: 'individual',
      firstName: 'Янус',
      patronimic: 'Полуэктович',
      orgId: -1,
      lastName: 'Невструев',
      isAdmin: false,
      isManager: false
    }
  ]
  let orgs = [
    { id: 0, name: 'OOO "Карго Менеджемент"' },
    { id: 1, name: 'OOO "Братан Турбо Дизель"' }
  ]
*/

  let realFetch = window.fetch
  window.fetch = function (url, opts) {
    return new Promise((resolve, reject) => {
      // wrap in timeout to simulate server api call
//      setTimeout(handleRoute, 5)

//      function handleRoute() {
        switch (true) {
//          case url.endsWith('/users/authenticate') && opts.method === 'POST':
//            return authenticate()
//          case url.endsWith('/users') && opts.method === 'GET':
//            return getUsers()
//          case url.match(/\/users\/\d+$/) && opts.method === 'GET':
//            return getUserById()
//          case url.match(/\/users\/\d+$/) && opts.method === 'PUT':
//            return updateUser()
//          case url.match(/\/users\/\d+$/) && opts.method === 'DELETE':
//            return deleteUser()
//          case url.endsWith('/orgs') && opts.method === 'GET':
//            return getOrgs()
//          case url.match(/\/orgs\/\d+$/) && opts.method === 'GET':
//            return getOrgById()
//          case url.match(/\/orgs\/\d+$/) && opts.method === 'PUT':
//            return updateOrg()
//          case url.match(/\/orgs\/\d+$/) && opts.method === 'DELETE':
//            return deleteOrg()
//          case url.endsWith('/shipments') && opts.method === 'GET':
//            return getShipments()
//          case url.match(/\/shipments\/.+$/) && opts.method === 'GET':
//            return getShipmentByNumber()
//          case url.match(/\/shipments\/.+$/) && opts.method === 'PUT':
//            return updateShipment()
//          case url.match(/\/shipments\/.+$/) && opts.method === 'DELETE':
//            return deleteShipment()
//          case url.match(/\/history\/.+$/) && opts.method === 'GET':
//            return getHistoryByNumber()
          case url.match(/\/status\/\d+$/) && opts.method === 'GET':
            return getStatusById()
          case url.match(/\/status\/.+$/) && opts.method === 'PUT':
            return updateStatus()
          case url.match(/\/status\/.+$/) && opts.method === 'DELETE':
            return deleteStatus()
          default:
            // pass through any requests not handled above
            return realFetch(url, opts)
              .then((response) => resolve(response))
              .catch((error) => reject(error))
        }
//      }

      // route functions

//      function authenticate() {
//        const { email, password } = body()
//        const user = users.find((x) => x.email === email && x.password === password)

//        if (!user) return error('Неправильный пароль или адрес электронной почты')

//        return ok({
//          id: user.id,
//          email: user.email,
//          firstName: user.firstName,
//          lastName: user.lastName,
//          patronimic: user.patronimic,
//          isAdmin: user.isAdmin,
//          isManager: user.isManager,
//          orgId: user.orgId,
//          token: 'fake-jwt-token-' + user.id
//        })
//      }

//      function getUsers() {
//        if (!isAuthenticated()) return unauthorized()
//        return ok(users)
//      }

//      function getUserById() {
//        if (!isAuthenticated()) return unauthorized()
//        const user = users.find((x) => x.id === idFromUrl())
//        return ok(basicDetails(user))
//      }

//      function updateUser() {
//        if (!isAuthenticated()) return unauthorized()

//        let params = body()
//        let user = users.find((x) => x.id === idFromUrl())

        // only update password if entered
//        if (!params.password) {
//          delete params.password
//        }

        // if email changed check if taken
//        if (params.email !== user.email && users.find((x) => x.email === params.email)) {
//          return error(
//            'Пользователь с электронной почтой "' + params.email + '" уже зарегистрирован'
//          )
//        }

        // update and save user
//        Object.assign(user, params)

//        return ok()
//      }

//      function deleteUser() {
//        if (!isAuthenticated()) return unauthorized()

//        users = users.filter((x) => x.id !== idFromUrl())
//        return ok()
//      }

//      function getOrgs() {
//        if (!isAuthenticated()) return unauthorized()
//        return ok(orgs)
//      }

//      function getOrgById() {
//        if (!isAuthenticated()) return unauthorized()
//        const org = orgs.find((x) => x.id === idFromUrl())
//        return ok(org)
//      }

//      function updateOrg() {
//        if (!isAuthenticated()) return unauthorized()

//        let params = body()
//        let org = orgs.find((x) => x.id === idFromUrl())

        // update and save user
//        Object.assign(org, params)

//        return ok()
//      }

//      function deleteOrg() {
//        if (!isAuthenticated()) return unauthorized()

//        orgs.filter((x) => x.id !== idFromUrl())
//        return ok()
//      }

//      function getShipments() {
//        if (!isAuthenticated()) return unauthorized()
//        return ok(shipments)
//      }

//      function getShipmentByNumber() {
//        if (!isAuthenticated()) return unauthorized()
//        const shipment = shipments.find((x) => x.shipmentNumber === numberFromUrl())
//        return ok(shipment)
//      }

      function updateShipment() {
        if (!isAuthenticated()) return unauthorized()

        let params = body()
        let shipment = shipments.find((x) => x.shipmentNumber === numberFromUrl())

        // update and save user
        Object.assign(shipment, params)

        return ok()
      }

      function deleteShipment() {
        if (!isAuthenticated()) return unauthorized()

        shipments.filter((x) => x.shipmentNumber !== numberFromUrl())
        return ok()
      }

      function getHistoryByNumber() {
        if (!isAuthenticated()) return unauthorized()
        const hst = history.filter((x) => x.shipmentNumber === numberFromUrl())
        return ok(hst)
      }

      function getStatusById() {
        if (!isAuthenticated()) return unauthorized()
        const status = history.find((x) => x.id === idFromUrl())
        return ok(status)
      }

      function updateStatus() {
        if (!isAuthenticated()) return unauthorized()

        let params = body()
        let status = history.find((x) => x.id === idFromUrl())

        // update and save user
        Object.assign(status, params)

        return ok()
      }

      function deleteStatus() {
        if (!isAuthenticated()) return unauthorized()

        history.filter((x) => x.id !== idFromUrl())
        return ok()
      }

      // helper functions
      function idFromUrl() {
        const urlParts = url.split('/')
        return parseInt(urlParts[urlParts.length - 1])
      }

      function numberFromUrl() {
        const urlParts = url.split('/')
        return urlParts[urlParts.length - 1]
      }

      function ok(body) {
        resolve({ ok: true, text: () => Promise.resolve(JSON.stringify(body)) })
      }

      function unauthorized() {
        resolve({
          status: 401,
          text: () => Promise.resolve(JSON.stringify({ message: 'Unauthorized' }))
        })
      }

//      function error(message) {
//        resolve({ status: 400, text: () => Promise.resolve(JSON.stringify({ message })) })
//      }

      function isAuthenticated() {
        return opts.headers['Authorization'].startsWith('Bearer')
      }

//      function basicDetails(user) {
//        const { id, firstName, patronimic, lastName, email, isAdmin, isManager, orgId } = user
//        return { id, firstName, patronimic, lastName, email, isAdmin, isManager, orgId }
//      }
      /*
      function isManager() {
        if (!isAuthenticated()) return false
        const words = opts.headers['Authorization'].split('-')
        if (words.length < 3) return false
        const id = parseInt(words[words.length - 1])
        if (isNaN(id)) return false
        const user = users.find((x) => x.id === id)
        return user.isManager
      }

      function isAdmin() {
        if (!isAuthenticated()) return false
        const words = opts.headers['Authorization'].split('-')
        if (words.length < 3) return false
        const id = parseInt(words[words.length - 1])
        if (isNaN(id)) return false
        const user = users.find((x) => x.id === id)
        return user.isAdmin
      }
*/
      function body() {
        return opts.body && JSON.parse(opts.body)
      }
    })
  }
}
