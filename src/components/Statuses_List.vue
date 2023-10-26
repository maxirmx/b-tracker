<script setup>
// Copyright (C) 2023 Maxim [maxirmx] Samsonov (www.sw.consulting)
// All rights reserved.
// This file is a part of s-tracker applcation
//
// Redistribution and use in source and binary forms, with or without
// modification, are permitted provided that the following conditions
// are met:
// 1. Redistributions of source code must retain the above copyright
// notice, this list of conditions and the following disclaimer.
// 2. Redistributions in binary form must reproduce the above copyright
// notice, this list of conditions and the following disclaimer in the
// documentation and/or other materials provided with the distribution.
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

import '@fortawesome/fontawesome-free/css/all.css'

import { storeToRefs } from 'pinia'
import moment from 'moment'
import router from '@/router'

import HistoryItem from '@/components/HistoryItem.vue'
import { statuses, stcodes } from '@/helpers/statuses.js'
import DeliveryTimeIcon from '@/components/icons/IconDeliveryTime.vue'

import { useConfirm } from 'vuetify-use-dialog'
const confirm = useConfirm()

import { useAuthStore } from '@/stores/auth.store.js'
const authStore = useAuthStore()

import { useAlertStore } from '@/stores/alert.store.js'
const alertStore = useAlertStore()
const { alert } = storeToRefs(alertStore)

import { utils, writeFileXLSX } from 'xlsx'

const props = defineProps({
  shipmentId: {
    type: Number,
    required: true
  }
})

import { useShipmentsStore } from '@/stores/shipments.store.js'
const shipmentStore = useShipmentsStore()
const { shipment } = storeToRefs(shipmentStore)
shipmentStore.get(props.shipmentId)

import { useHistoryStore } from '@/stores/history.store.js'
const historyStore = useHistoryStore()
const { history } = storeToRefs(historyStore)

historyStore.getByShipmentId(props.shipmentId)

function exportData() {
  var index = history.value.length

  const rowsm = history.value.map((row) => ({
    id: (index--).toString(),
    date: moment(row.date, 'YYYY-MM-DD').format('DD.MM.YYYY'),
    location: row.location,
    status: statuses.getName(row.status),
    comment: row.comment
  }))

  const row0 = [
    {
      id: (history.value.length + 1).toString(),
      date: shipment.value?.ddate
        ? moment(shipment.value.ddate, 'YYYY-MM-DD').format('DD.MM.YYYY')
        : moment().format('DD.MM.YYYY'),
      location: shipment.value?.dest ? shipment.value.dest : '',
      status: 'Ожидаемая дата прибытия в пункт назначения',
      comment: ''
    }
  ]

  const rows = shipment.value?.status != stcodes.VERY_DELIVERED ? row0.concat(rowsm) : rowsm

  const worksheet = utils.json_to_sheet(rows)
  const workbook = utils.book_new()
  utils.book_append_sheet(workbook, worksheet, 'История отправления ' + shipment.value?.number)

  utils.sheet_add_aoa(worksheet, [['№', 'Дата', 'Местонахождение', 'Статус', 'Комментарий']], {
    origin: 'A1'
  })
  const mw0 = rows.reduce((w, r) => Math.max(w, r.id.length), 1)
  const mw1 = 'DD.MM.YYYY'.length
  const mw2 = rows.reduce((w, r) => Math.max(w, r.location.length), 'Местонахождение'.length)
  const mw3 = rows.reduce((w, r) => Math.max(w, r.status.length), 'Статус'.length)
  const mw4 = rows.reduce((w, r) => Math.max(w, r.comment.length), '"Комментарий'.length)
  worksheet['!cols'] = [
    { wch: mw0 + 2 },
    { wch: mw1 + 2 },
    { wch: mw2 + 2 },
    { wch: mw3 + 2 },
    { wch: mw4 + 2 }
  ]

  writeFileXLSX(workbook, props.shipmentNumber + '.xlsx', { compression: true })
}

async function deleteStatus(item) {
  const content =
    'Удалить из истории статус "' +
    statuses.getName(item.status) +
    '" от ' +
    moment(item.date, 'YYYY-MM-DD').format('DD.MM.YYYY') +
    ' ?'
  const result = await confirm({
    title: 'Подтверждение',
    confirmationText: 'Удалить',
    cancellationText: 'Не удалять',
    dialogProps: {
      width: '50%',
      minWidth: '250px'
    },
    confirmationButtonProps: {
      color: 'orange-darken-3'
    },
    content: content
  })

  if (!result) return
  historyStore
    .delete(item.id)
    .then(() => {
      historyStore.getByShipmentId(props.shipmentId)
    })
    .catch((error) => {
      alertStore.error(error)
    })
}
</script>

<template>
  <div class="settings list-1">
    <h1 class="orange btn-wrapper">
      <span>История отправления {{ shipment.number }}</span>
      <button @click="$router.go(-1)">
        <font-awesome-icon size="1x" icon="fa-solid fa-arrow-right-from-bracket" class="btn" />
      </button>
    </h1>
    <div class="orange customer">Маршрут: {{ shipment.origin }} - {{ shipment.dest }}</div>
    <div class="orange customer">Клиент: {{ shipment.name }}</div>
    <hr class="hr" />
    <div class="link-crt">
      <router-link
        v-if="shipment.status != stcodes.VERY_DELIVERED && authStore.user?.isManager"
        :to="'/status/add/' + props.shipmentId"
        class="link"
      >
        <font-awesome-icon size="1x" icon="fa-solid fa-calendar-plus" class="link" />
        Добавить новый статус
      </router-link>
      <span v-if="shipment.status != stcodes.VERY_DELIVERED && authStore.user?.isManager"
        >&nbsp;&nbsp;&nbsp;</span
      >
      <router-link
        v-if="!shipment.isArchieved && !authStore.user?.isAdmin && authStore.user?.isManager"
        :to="'/status/edit/' + shipment.id + '/' + shipment.statusId"
        class="link"
        ><font-awesome-icon size="1x" icon="fa-solid fa-pen-to-square" class="link" /> Изменить
        последний статус
      </router-link>
      <span v-if="!shipment.isArchieved && !authStore.user?.isAdmin && authStore.user?.isManager"
        >&nbsp;&nbsp;&nbsp;</span
      >
      <a class="link" @click="exportData()">
        <font-awesome-icon size="1x" icon="fa-solid fa-download" class="link" />
        Загрузить историю
      </a>
    </div>
    <br /><br />

    <div v-if="shipment.status != stcodes.VERY_DELIVERED">
      <HistoryItem>
        <template #icon>
          <component :is="DeliveryTimeIcon"></component>
        </template>
        <template #heading> Ожидаемая дата прибытия в пункт назначения</template>
        <template #info>
          {{
            shipment.ddate ? moment(shipment.ddate, 'YYYY-MM-DD').format('DD.MM.YYYY') : ''
          }}&nbsp;&nbsp;&nbsp;{{ shipment.dest }}
        </template>
      </HistoryItem>
      <hr class="hr-light" />
    </div>
    <HistoryItem v-for="item in history" :key="item">
      <template #icon>
        <component :is="statuses.getIcon(item.status)"></component>
      </template>
      <template #heading> {{ statuses.getName(item.status) }} </template>
      <template #info>
        {{
          item.date ? moment(item.date, 'YYYY-MM-DD').format('DD.MM.YYYY') : ''
        }}&nbsp;&nbsp;&nbsp;
        {{ item.location }}
        <br />
        <span v-if="item.comment">{{ item.comment }}</span>
      </template>
      <template #actions>
        <button
          v-if="authStore.user?.isAdmin"
          @click="router.push('/status/edit/' + shipment.id + '/' + item.id)"
          class="anti-btn"
        >
          <font-awesome-icon size="1x" icon="fa-solid fa-pen" class="anti-btn" />
        </button>
        <button v-if="authStore.user?.isAdmin" @click="deleteStatus(item)" class="anti-btn">
          <font-awesome-icon size="1x" icon="fa-solid fa-trash-can" class="anti-btn" />
        </button>
      </template>
    </HistoryItem>
    <div v-if="history?.loading || shipment?.loading" class="text-center m-5">
      <span class="spinner-border spinner-border-lg align-center"></span>
    </div>
    <div v-if="history?.error" class="text-center m-5">
      <div class="text-danger">Ошибка при загрузке истории отправления: {{ history.error }}</div>
    </div>
    <div v-if="shipment?.error" class="text-center m-5">
      <div class="text-danger">
        Ошибка при загрузке информации об отправлении: {{ shipment.error }}
      </div>
    </div>
    <div v-if="alert" class="alert alert-dismissable mt-3 mb-0" :class="alert.type">
      <button @click="alertStore.clear()" class="btn btn-link close">×</button>
      {{ alert.message }}
    </div>
  </div>
</template>

<style>
.customer {
  font-size: 1.5 rem;
  font-weight: 500;
  margin-bottom: 0.4rem;
}
</style>
