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

import { VDataTable } from 'vuetify/lib/labs/components.mjs'

import router from '@/router'
import { storeToRefs } from 'pinia'
import { useOrgsStore } from '@/stores/orgs.store.js'
import { itemsPerPageOptions } from '@/helpers/items.per.page.js'
import { mdiMagnify } from '@mdi/js'

import { useAlertStore } from '@/stores/alert.store.js'
import { useAuthStore } from '@/stores/auth.store.js'

import { useConfirm } from 'vuetify-use-dialog'
const confirm = useConfirm()

const alertStore = useAlertStore()
const { alert } = storeToRefs(alertStore)

const authStore = useAuthStore()

const orgsStore = useOrgsStore()
const { orgs } = storeToRefs(orgsStore)
orgsStore.getAll()

function orgSettings(item) {
  var id = item.selectable.id
  router.push('org/edit/' + id)
}

async function deleteOrg(item) {
  const content = 'Удалить организацию "' + item.selectable.name + '" ?'
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
    orgsStore
      .delete(item.selectable.id)
      .then(() => {
        orgsStore.getAll()
      })
      .catch((error) => {
        alertStore.error(error)
      })
  }
}

const headers = [
  { title: 'Организация', align: 'start', key: 'name', sortable: true },
  { title: 'Пользователей', align: 'center', key: 'num_users', sortable: true },
  { title: 'Отправлений / Архив', align: 'center', key: 'num_shipments', sortable: true },
  { title: '', align: 'center', key: 'actions1', sortable: false },
  { title: '', align: 'center', key: 'actions2', sortable: false }
]
</script>

<template>
  <div class="settings table-1">
    <h1 class="orange">Организации</h1>
    <hr class="hr" />

    <div class="link-crt">
      <router-link to="/org/add" class="link"
        ><font-awesome-icon
          size="1x"
          icon="fa-solid fa-house-chimney-medical"
          class="link"
        />&nbsp;&nbsp;&nbsp;Зарегистрировать организацию
      </router-link>
    </div>

    <v-card>
      <v-data-table
        v-if="orgs?.length"
        v-model:items-per-page="authStore.orgs_per_page"
        items-per-page-text="Организаций на странице"
        page-text="{0}-{1} из {2}"
        v-model:page="authStore.orgs_page"
        :items-per-page-options="itemsPerPageOptions"
        :headers="headers"
        :items="orgs"
        :search="authStore.orgs_search"
        v-model:sort-by="authStore.orgs_sort_by"
        class="elevation-1"
      >
        <template v-slot:[`item.num_shipments`]="{ item }">
          {{ item.selectable.num_shipments }} / {{ item.selectable.num_archieved }}
        </template>
        <template v-slot:[`item.actions1`]="{ item }">
          <button @click="orgSettings(item)" class="anti-btn">
            <font-awesome-icon
              @click="orgSettings(item)"
              size="1x"
              icon="fa-solid fa-pen"
              class="anti-btn"
              type="button"
            />
          </button>
        </template>
        <template v-slot:[`item.actions2`]="{ item }">
          <button
            @click="deleteOrg(item)"
            class="anti-btn"
            v-if="item.selectable.num_shipments == 0 && item.selectable.num_users == 0"
            type="button"
          >
            <font-awesome-icon size="1x" icon="fa-solid fa-trash-can" class="anti-btn" />
          </button>
        </template>
      </v-data-table>
      <v-spacer></v-spacer>
      <v-text-field
        v-model="authStore.orgs_search"
        :append-inner-icon="mdiMagnify"
        label="Поиск по названию организации"
        variant="solo"
        hide-details
      ></v-text-field>
    </v-card>
    <div v-if="orgs?.error" class="text-center m-5">
      <div class="text-danger">Ошибка при загрузке списка организаций: {{ orgs.error }}</div>
    </div>
    <div v-if="orgs?.loading" class="text-center m-5">
      <span class="spinner-border spinner-border-lg align-center"></span>
    </div>
    <div v-if="alert" class="alert alert-dismissable mt-3 mb-0" :class="alert.type">
      <button @click="alertStore.clear()" class="btn btn-link close">×</button>
      {{ alert.message }}
    </div>
  </div>
</template>
