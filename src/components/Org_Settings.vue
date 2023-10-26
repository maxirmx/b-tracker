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

import { storeToRefs } from 'pinia'
import { Form, Field } from 'vee-validate'
import router from '@/router'
import * as Yup from 'yup'

import { useOrgsStore } from '@/stores/orgs.store.js'

const props = defineProps({
  register: {
    type: Boolean,
    required: true
  },
  id: {
    type: Number,
    required: false
  }
})

const schema = Yup.object().shape({
  name: Yup.string().required('Необходимо указать название организации')
})

function isRegister() {
  return props.register
}

function getTitle() {
  return (isRegister() ? 'Регистрация' : 'Редактирование') + ' организации'
}

function getButton() {
  return isRegister() ? 'Зарегистрировать' : 'Сохранить'
}

const orgsStore = useOrgsStore()
let org = null

if (!isRegister()) {
  ;({ org } = storeToRefs(orgsStore))
  orgsStore.getById(props.id)
}

function onSubmit(values, { setErrors }) {
  if (isRegister()) {
    return orgsStore
      .add(values)
      .then(() => {
        router.go(-1)
      })
      .catch((error) => setErrors({ apiError: error }))
  } else {
    return orgsStore
      .update(props.id, values)
      .then(() => {
        router.go(-1)
      })
      .catch((error) => setErrors({ apiError: error }))
  }
}
</script>

<template>
  <div class="settings form-1">
    <h1 class="orange">{{ getTitle() }}</h1>
    <hr class="hr" />
    <Form
      @submit="onSubmit"
      :initial-values="org"
      :validation-schema="schema"
      v-slot="{ errors, isSubmitting }"
    >
      <div class="form-group">
        <label for="lastName" class="label">Название:</label>
        <Field
          name="name"
          id="name"
          type="text"
          class="form-control input"
          :class="{ 'is-invalid': errors.name }"
          placeholder="Название организации"
        />
      </div>

      <div class="form-group">
        <button class="button" type="submit" :disabled="isSubmitting">
          <span v-show="isSubmitting" class="spinner-border spinner-border-sm mr-1"></span>
          {{ getButton() }}
        </button>
        <button class="button" type="button" @click="$router.go(-1)" :disabled="isSubmitting">
          <span v-show="isSubmitting" class="spinner-border spinner-border-sm mr-1"></span>
          Отменить
        </button>
      </div>
      <div v-if="errors.name" class="alert alert-danger mt-3 mb-0">{{ errors.name }}</div>
      <div v-if="org?.error" class="text-center m-5">
        <div class="text-danger">
          Ошибка при загрузке информации об организации: {{ org.error }}
        </div>
      </div>
      <div v-if="errors.apiError" class="alert alert-danger mt-3 mb-0">
        <div class="text-danger">{{ errors.apiError }}</div>
      </div>
      <div v-if="org?.loading" class="text-center m-5">
        <span class="spinner-border spinner-border-lg align-center"></span>
      </div>
    </Form>
  </div>
</template>
