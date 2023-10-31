<script setup>
// Copyright (C) 2023 Maxim [maxirmx] Samsonov (www.sw.consulting)
// All rights reserved.
// This file is a part of b-tracker applcation
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

import { computed } from 'vue'
import { Form, Field } from 'vee-validate'
import { storeToRefs } from 'pinia'
import * as Yup from 'yup'
import router from '@/router'
import { strategies } from '@/helpers/strategies.js'

import { useAuthStore } from '@/stores/auth.store.js'
import { useBTasksStore } from '@/stores/btasks.store.js'

const props = defineProps({
  create: {
    type: Boolean,
    required: true
  },
  btaskId: {
    type: Number,
    required: false
  }
})

const authStore = useAuthStore()
const btasksStore = useBTasksStore()
const { btask } = storeToRefs(btasksStore)
if (!props.create) {
  btasksStore.get(props.btaskId)
}

const userIdError = 'Не удалось определить идентификатор пользователя. Это внутренняя ошибка.'
const schema = Yup.object().shape({
  strategy: Yup.string().required('Выберите статус'),
  symbol1: Yup.string().required('Введите символ 1'),
  symbol2: Yup.string().required('Введите символ 2'),
  threshold: Yup.number().required('Введите порог'),
  userId: Yup.number(userIdError).typeError(userIdError).integer(userIdError).required(userIdError)
})

function isRegister() {
  return props.create
}

function getTitle() {
  return isRegister() ? 'Новый торговый робот' : 'Изменение параметров торгового робота'
}

function onSubmit(values, { setErrors }) {
  if (props.create) {
    return btasksStore
      .add(values)
      .then(() => {
        router.go(-1)
      })
      .catch((error) => setErrors({ apiError: error }))
  } else {
    return btasksStore
      .update(props.robotId, values)
      .then(() => {
        router.go(-1)
      })
      .catch((error) => setErrors({ apiError: error }))
  }
}

const status = computed(() => {
  return {
    strategy: props.create ? '' : btask.value.strategy,
    symbol1: props.create ? '' : btask.value.symbol1,
    symbol2: props.create ? '' : btask.value.symbol2,
    threshold: props.create ? '': btask.value.threshold,
    userId: props.create ? authStore.user?.id : btask.value.userId
  }
})

</script>

<template>
  <div class="settings form-2">
    <h1 class="orange">{{ getTitle() }}</h1>
    <hr class="hr" />
    <Form
      @submit="onSubmit"
      :initial-values="status"
      :validation-schema="schema"
      v-slot="{ errors, isSubmitting }"
    >
      <div class="form-group">
        <label for="strategy" class="label">Стратегия:</label>
        <Field
          name="strategy"
          as="select"
          class="form-control input select"
          :class="{ 'is-invalid': errors.strategy }"
        >
          <option value="">Выберите стратегию</option>
          <option v-for="strategy in strategies.items" :key="strategy" :value="strategy.name">
            {{ strategy.name }}
          </option>
        </Field>
      </div>
      <div class="form-group">
        <label for="symbol1" class="label">Базовая криптовалюта:</label>
        <Field
          name="symbol1"
          type="text"
          class="form-control input"
          :class="{ 'is-invalid': errors.symbol1 }"
          placeholder="Символ 1"
        />
      </div>

      <div class="form-group">
        <label for="symbol2" class="label">Криптовалюта котировки:</label>
        <Field
          name="symbol2"
          type="text"
          class="form-control input"
          :class="{ 'is-invalid': errors.symbol2 }"
          placeholder="Символ 2"
        />
      </div>

      <div class="form-group">
        <label for="threshold" class="label">Порог:</label>
        <Field
          name="threshold"
          type="text"
          class="form-control input"
          :class="{ 'is-invalid': errors.threshold }"
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
      <div v-if="errors.number" class="alert alert-danger mt-3 mb-0">
        {{ errors.number }}
      </div>
      <div v-if="errors.strategy" class="alert alert-danger mt-3 mb-0">{{ errors.strategy }}</div>
      <div v-if="errors.symbol1" class="alert alert-danger mt-3 mb-0">{{ errors.symbol1 }}</div>
      <div v-if="errors.symbol2" class="alert alert-danger mt-3 mb-0">{{ errors.symbol2 }}</div>
      <div v-if="errors.threshold" class="alert alert-danger mt-3 mb-0">{{ errors.threshold }}</div>
      <div v-if="errors.userId" class="alert alert-danger mt-3 mb-0">{{ errors.userId }}</div>
      <div v-if="errors.apiError" class="alert alert-danger mt-3 mb-0">{{ errors.apiError }}</div>
    </Form>
  </div>
</template>
