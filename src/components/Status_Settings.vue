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

import { Form, Field } from 'vee-validate'
import * as Yup from 'yup'
import moment from 'moment'

import router from '@/router'
import { computed } from 'vue'
import { storeToRefs } from 'pinia'

import { statuses } from '@/helpers/statuses.js'

const props = defineProps({
  create: {
    type: Boolean,
    required: true
  },
  shipmentId: {
    type: Number,
    required: true
  },
  statusId: {
    type: Number,
    required: false
  }
})

import { useHistoryStore } from '@/stores/history.store.js'
const historyStore = useHistoryStore()
const { status } = storeToRefs(historyStore)
if (!props.create) {
  historyStore.getByStatusId(props.statusId)
}

import { useShipmentsStore } from '@/stores/shipments.store.js'
const shipmentStore = useShipmentsStore()
const { shipment } = storeToRefs(shipmentStore)
shipmentStore.get(props.shipmentId)

const sts = computed(() => {
  return {
    status: props.create ? '' : status.value.status,
    location: props.create ? '' : status.value.location,
    date: props.create
      ? moment().format('YYYY-MM-DD')
      : moment(status.value.date).format('YYYY-MM-DD'),
    dest: shipment && !shipment.value.loading ? shipment.value.dest : 'загружается ...',
    ddate: shipment && !shipment.value.loading ? shipment.value.ddate : 'загружается ...',
    comment: props.create ? '' : status.value.comment
  }
})

const schema = Yup.object().shape({
  status: Yup.string().required('Выберите статус'),
  location: Yup.string().required('Укажите местонахождение'),
  date: Yup.string().required('Укажите дату'),
  ddate: Yup.string().required('Укажите ожидаемую дату прибытия')
})

function onSubmit(values, { setErrors }) {
  values.shipmentId = props.shipmentId
  if (props.create) {
    return historyStore
      .add(values)
      .then(() => {
        router.go(-1)
      })
      .catch((error) => setErrors({ apiError: error }))
  } else {
    return historyStore
      .update(props.statusId, values)
      .then(() => {
        router.go(-1)
      })
      .catch((error) => setErrors({ apiError: error }))
  }
}

function getHeader() {
  return props.create ? 'Новый статус' : 'Изменение статуса'
}
</script>

<template>
  <div class="settings form-2">
    <h1 class="orange">{{ getHeader() }} отправления {{ shipment.number }}</h1>
    <hr class="hr" />
    <Form
      @submit="onSubmit"
      :initial-values="sts"
      :validation-schema="schema"
      v-slot="{ errors, isSubmitting }"
    >
      <div class="form-group">
        <label for="status" class="label">Статус:</label>
        <Field
          name="status"
          as="select"
          class="form-control input select"
          :class="{ 'is-invalid': errors.status }"
        >
          <option value="">Выберите статус</option>
          <option v-for="status in statuses.items" :key="status" :value="status.id">
            {{ status.name }}
          </option>
        </Field>
      </div>
      <div class="form-group">
        <label for="location" class="label">Местонахождение:</label>
        <Field
          name="location"
          type="text"
          class="form-control input"
          :class="{ 'is-invalid': errors.location }"
          placeholder="Город, Страна"
        />
      </div>

      <div class="form-group">
        <label for="date" class="label">Дата:</label>
        <Field
          name="date"
          type="date"
          class="form-control input"
          :class="{ 'is-invalid': errors.date }"
        />
      </div>

      <div class="form-group">
        <label for="comment" class="label">Комментарий:</label>
        <Field
          name="comment"
          type="text"
          class="form-control input"
          :class="{ 'is-invalid': errors.comment }"
        />
      </div>

      <div class="form-group">
        <label for="ddate" class="label">Ожидаемая дата прибытия:</label>
        <Field
          name="ddate"
          type="date"
          class="form-control input"
          :class="{ 'is-invalid': errors.ddate }"
        />
      </div>

      <div class="form-group">
        <button class="button" type="submit" :disabled="isSubmitting">
          <span v-show="isSubmitting" class="spinner-border spinner-border-sm mr-1"></span>
          Сохранить
        </button>
        <button class="button" type="button" @click="$router.go(-1)" :disabled="isSubmitting">
          <span v-show="isSubmitting" class="spinner-border spinner-border-sm mr-1"></span>
          Отменить
        </button>
      </div>
      <div v-if="errors.status" class="alert alert-danger mt-3 mb-0">{{ errors.status }}</div>
      <div v-if="errors.location" class="alert alert-danger mt-3 mb-0">{{ errors.location }}</div>
      <div v-if="errors.date" class="alert alert-danger mt-3 mb-0">{{ errors.date }}</div>
      <div v-if="errors.ddate" class="alert alert-danger mt-3 mb-0">{{ errors.ddate }}</div>
      <div v-if="errors.comment" class="alert alert-danger mt-3 mb-0">{{ errors.comment }}</div>
    </Form>
  </div>
</template>
