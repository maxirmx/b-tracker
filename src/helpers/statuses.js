// Copyright (C) 2023 Maxim [maxirmx] Samsonov  (www.sw.consulting)
// All rights reserved.
// This file is a part of s-tracker applcation
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

import { reactive, markRaw } from 'vue'

import CustomsStartIcon from '@/components/icons/IconCustomsStart.vue'
import CustomsEndIcon from '@/components/icons/IconCustomsEnd.vue'
import OutOfStorageIcon from '@/components/icons/IconOutOfStorage.vue'
import InStorageIcon from '@/components/icons/IconInStorage.vue'
import RegisteredIcon from '@/components/icons/IconRegistered.vue'
import CollectedIcon from '@/components/icons/IconCollected.vue'
import DeliveredIcon from '@/components/icons/IconDelivered.vue'
import VeryDeliveredIcon from '@/components/icons/IconVeryDelivered.vue'

import OutOfCountryOfOriginIcon from '@/components/icons/IconOutOfCountryOfOrigin.vue'
import IntoCountryOfTransitIcon from '@/components/icons/IconIntoCountryOfTransit.vue'
import OutOfCountryOfTransitIcon from '@/components/icons/IconOutOfCountryOfTransit.vue'
import IntoCountryOfDestinationIcon from '@/components/icons/IconIntoCountryOfDestination.vue'
import WaitingForTransitIcon from '@/components/icons/IconWaitingForTransit.vue'
import InTransitIcon from '@/components/icons/IconInTransit.vue'
import WaitingForShipmentIcon from '@/components/icons/IconWaitingForShipment.vue'
import WaitingIcon from '@/components/icons/IconWaiting.vue'

import UnknownIcon from '@/components/icons/IconUnknown.vue'

export const stcodes = {
  REGISTERED: 0,
  COLLECTED: 1,
  IN_STORAGE: 2,
  OUT_OF_STORAGE: 3,
  CUSTOMS_START: 4,
  CUSTOMS_END: 5,
  DELIVERED: 6,
  OUT_OF_COUNTRY_OF_ORIGIN: 7,
  INTO_COUNTRY_OF_TRANSIT: 8,
  OUT_OF_COUNTRY_OF_TRANSIT: 9,
  INTO_COUNTRY_OF_DESTINATION: 10,
  WAITING_FOR_TRANSIT: 11,
  IN_TRANSIT: 12,
  WAITING: 13,
  WAITING_FOR_SHIPMENT: 14,
  VERY_DELIVERED: 15
}

export const statuses = reactive({
  items: [
    {
      id: stcodes.REGISTERED,
      name: 'Заявка на перевозку зарегистрирована',
      icon: markRaw(RegisteredIcon)
    },
    {
      id: stcodes.WAITING_FOR_SHIPMENT,
      name: 'Ожидание готовности груза',
      icon: markRaw(WaitingForShipmentIcon)
    },
    {
      id: stcodes.COLLECTED,
      name: 'Груз забран у отправителя',
      icon: markRaw(CollectedIcon)
    },
    {
      id: stcodes.WAITING,
      name: 'Ожидание',
      icon: markRaw(WaitingIcon)
    },
    {
      id: stcodes.WAITING_FOR_TRANSIT,
      name: 'Ожидание отправления',
      icon: markRaw(WaitingForTransitIcon)
    },
    {
      id: stcodes.IN_TRANSIT,
      name: 'Груз в пути',
      icon: markRaw(InTransitIcon)
    },
    {
      id: stcodes.IN_STORAGE,
      name: 'Груз прибыл на склад',
      icon: markRaw(InStorageIcon)
    },
    {
      id: stcodes.OUT_OF_STORAGE,
      name: 'Груз убыл со склада',
      icon: markRaw(OutOfStorageIcon)
    },
    {
      id: stcodes.CUSTOMS_START,
      name: 'Начало таможенного оформления',
      icon: markRaw(CustomsStartIcon)
    },
    {
      id: stcodes.CUSTOMS_END,
      name: 'Окончание таможенного оформления',
      icon: markRaw(CustomsEndIcon)
    },
    {
      id: stcodes.OUT_OF_COUNTRY_OF_ORIGIN,
      name: 'Груз покинул страну отправления',
      icon: markRaw(OutOfCountryOfOriginIcon)
    },
    {
      id: stcodes.INTO_COUNTRY_OF_TRANSIT,
      name: 'Груз прибыл в страну транзита',
      icon: markRaw(IntoCountryOfTransitIcon)
    },
    {
      id: stcodes.OUT_OF_COUNTRY_OF_TRANSIT,
      name: 'Груз покинул страну транзита',
      icon: markRaw(OutOfCountryOfTransitIcon)
    },
    {
      id: stcodes.INTO_COUNTRY_OF_DESTINATION,
      name: 'Груз прибыл в страну назначения',
      icon: markRaw(IntoCountryOfDestinationIcon)
    },
    {
      id: stcodes.DELIVERED,
      name: 'Груз прибыл в пункт назначения',
      icon: markRaw(DeliveredIcon)
    },
    {
      id: stcodes.VERY_DELIVERED,
      name: 'Перевозка завершена. Груз доставлен получателю',
      icon: markRaw(VeryDeliveredIcon)
    }
  ],

  getName(code) {
    const item = this.items.find((obj) => {
      return obj.id === code
    })
    return item ? item.name : 'неизвестный статус'
  },
  getIcon(code) {
    const item = this.items.find((obj) => {
      return obj.id === code
    })
    return item ? item.icon : markRaw(UnknownIcon)
  }
})
