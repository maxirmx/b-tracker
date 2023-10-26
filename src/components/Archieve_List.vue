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

import moment from 'moment'

import { VDataTable } from 'vuetify/lib/labs/components.mjs'
import router from '@/router'
import { storeToRefs } from 'pinia'
import { statuses } from '@/helpers/statuses.js'
import { itemsPerPageOptions } from '@/helpers/items.per.page.js'
import { mdiMagnify } from '@mdi/js'

import { useConfirm } from 'vuetify-use-dialog'
const confirm = useConfirm()

import { useShipmentsStore } from '@/stores/shipments.store.js'
import { useAuthStore } from '@/stores/auth.store.js'
import { useAlertStore } from '@/stores/alert.store.js'

const authStore = useAuthStore()

const shipmentsStore = useShipmentsStore()
const { shipments } = storeToRefs(shipmentsStore)
shipmentsStore.getAll(true)

const alertStore = useAlertStore()
const { alert } = storeToRefs(alertStore)

function getStatus(item) {
  return statuses.getName(item.status)
}

function getDate(date) {
  return moment(date, 'YYYY-MM-DD').format('DD.MM.YYYY')
}

function editShipment(item) {
  router.push('shipment/edit/' + item.id)
}

function viewHistory(item) {
  router.push('shipment/' + item.id)
}

async function deleteShipment(item) {
  const content = 'Удалить отправление "' + item['number'] + '" ?'
  const result = await confirm({
    title: 'Подтверждение',
    confirmationText: 'Удалить',
    cancellationText: 'Не удалять',
    dialogProps: {
      width: '30%',
      minWidth: '250px'
    },
    confirmationButtonProps: {
      color: 'orange-darken-3'
    },
    content: content
  })

  if (result) {
    shipmentsStore
      .delete(item['id'])
      .then(() => {
        shipmentsStore.getAll()
      })
      .catch((error) => {
        alertStore.error(error)
      })
  }
}

function filterArchieve(value, query, item) {
  if (query == null) return false
  const q = query.toLocaleUpperCase()
  if (
    item.selectable.origin.toLocaleUpperCase().indexOf(q) !== -1 ||
    item.selectable.dest.toLocaleUpperCase().indexOf(q) !== -1 ||
    item.selectable.number.toLocaleUpperCase().indexOf(q) !== -1 ||
    (item.selectable.name.toLocaleUpperCase().indexOf(q) !== -1 && authStore.user?.isManager) ||
    moment(item.selectable.date, 'YYYY-MM-DD').format('DD.MM.YYYY').indexOf(q) !== -1 ||
    item.selectable.location.toLocaleUpperCase().indexOf(q) !== -1 ||
    getStatus(item.selectable).toLocaleUpperCase().indexOf(q) !== -1
  ) {
    return true
  }
  return false
}

const hd1 = { title: 'Номер', align: 'start', key: 'number' }
const hd2 = { title: 'Маршрут', align: 'start', key: 'route' }
const hd3 = { title: 'Дата доставки', align: 'start', key: 'date' }
const hd4 = { title: 'Клиент', align: 'start', key: 'name' }
const hd5 = { title: 'Место', align: 'start', key: 'location' }
const hd6 = { title: 'Статус', align: 'start', key: 'statuses', sortable: false }
const hd8 = { title: '', align: 'center', key: 'actions1', sortable: false }
const hd9 = { title: '', align: 'center', key: 'actions2', sortable: false }
const hdA = { title: '', align: 'center', key: 'actions3', sortable: false }

const headers = authStore.user?.isManager
  ? [hd1, hd2, hd3, hd4, hd5, hd6, hd8, hd9, hdA]
  : [hd1, hd2, hd3, hd5, hd6, hd8, hd9, hdA]
</script>

<template>
  <div class="setting table-3">
    <h1 class="orange">Архив отправлений</h1>
    <hr class="hr" />

    <v-card>
      <v-data-table
        v-if="shipments?.length"
        v-model:items-per-page="authStore.archieve_per_page"
        items-per-page-text="Отправлений на странице"
        :items-per-page-options="itemsPerPageOptions"
        page-text="{0}-{1} из {2}"
        v-model:page="authStore.archieve_page"
        :headers="headers"
        :items="shipments"
        :search="authStore.archieve_search"
        :custom-filter="filterArchieve"
        v-model:sort-by="authStore.archieve_sort_by"
        item-value="number"
        class="elevation-1"
      >
        <template v-slot:[`item.route`]="{ item }">
          {{ item.selectable.origin }} - {{ item.selectable.dest }}
        </template>

        <template v-slot:[`item.date`]="{ item }">
          {{ getDate(item.selectable.date) }}
        </template>

        <template v-slot:[`item.statuses`]="{ item }">
          {{ getStatus(item.selectable) }}
        </template>

        <template v-slot:[`item.actions1`]="{ item }">
          <button @click="viewHistory(item.selectable)" class="anti-btn">
            <font-awesome-icon
              size="1x"
              icon="fa-solid fa-arrow-right-to-bracket"
              class="anti-btn"
            />
          </button>
        </template>
        <template v-slot:[`item.actions2`]="{ item }">
          <button
            v-if="authStore.user?.isAdmin"
            @click="editShipment(item.selectable)"
            class="anti-btn"
          >
            <font-awesome-icon size="1x" icon="fa-solid fa-pen" class="anti-btn" />
          </button>
        </template>
        <template v-slot:[`item.actions3`]="{ item }">
          <button
            v-if="authStore.user?.isAdmin"
            @click="deleteShipment(item.selectable)"
            class="anti-btn"
          >
            <font-awesome-icon size="1x" icon="fa-solid fa-trash-can" class="anti-btn" />
          </button>
        </template>
      </v-data-table>
      <v-spacer></v-spacer>
      <v-text-field
        v-model="authStore.archieve_search"
        :append-inner-icon="mdiMagnify"
        label="Поиск по любой информации об отправлении"
        variant="solo"
        hide-details
      />
    </v-card>
    <div v-if="shipments?.loading" class="text-center m-5">
      <span class="spinner-border spinner-border-lg align-center"></span>
    </div>
    <div v-if="shipments?.error" class="text-center m-5">
      <div class="text-danger">Ошибка при загрузке списка отправлений: {{ shipments.error }}</div>
    </div>
    <div v-if="alert" class="alert alert-dismissable mt-3 mb-0" :class="alert.type">
      <button @click="alertStore.clear()" class="btn btn-link close">×</button>
      {{ alert.message }}
    </div>
  </div>
</template>
