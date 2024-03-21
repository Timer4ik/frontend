<template>
    <header class="header">
        <UiStack gap="3" align-items="center">
            <div class="header__title">
                <div @click="$router.back()" v-if="!hideGoBack" style="
                        min-width: 40px;
                        min-height: 40px;
                        max-width: 40px;
                        max-height: 40px;
                        display: flex;
                        align-items: center;
                    " class="header__goback">
                    <svg width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path
                            d="M14.2617 1.5577L12.8517 0.147705L7.26172 5.73771L1.67172 0.147705L0.261719 1.5577L5.85172 7.14771L0.261719 12.7377L1.67172 14.1477L7.26172 8.5577L12.8517 14.1477L14.2617 12.7377L8.67172 7.14771L14.2617 1.5577Z"
                            fill="#204EE0"></path>
                    </svg>
                </div>
                <div class="title-">
                    {{ title.length>=40 ? title.slice(0, 40) + "..." : title }}
                </div>
            </div>
            <slot name="actions" />
        </UiStack>

        <UiDropdownMenu2 position="right">
            <template #body>
                <div style="cursor: pointer;" @click="useAuth().logout()">Выйти</div>
            </template>
            <template #dropdown>
                <UiStack class="auth-user" gap="1" align-items="center">
                    <div class="auth-user__aside">
                        <div class="user-ava">
                            <div class="user-ava__text">А</div>
                        </div>
                    </div>
                    <div class="auth-user__aside">
                        <ul class="auth-user-items">
                            <li class="auth-user-items__item">
                                <div class="user-name">Админ</div>
                            </li>
                            <li class="auth-user-items__item">
                                <div class="user-position">Администратор</div>
                            </li>
                        </ul>
                    </div>
                    <div class="auth-user__aside">
                        <div class="auth-user-collapse"><svg width="10" height="6" class="auth-user-collapse__icon"
                                viewBox="0 0 10 6" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M1 1L5 5L9 1" stroke="#204EE0" stroke-width="2" stroke-linecap="round"
                                    stroke-linejoin="round"></path>
                            </svg></div>
                    </div>
                </UiStack>
            </template>
        </UiDropdownMenu2>

    </header>
</template>
        
<script  setup>
defineProps({
    title: String,
    hideGoBack: Boolean
})
</script>

<style>
.user-ava {
    align-items: center;
    background: #d2dbf9;
    border-radius: 100%;
    display: flex;
    height: 42px;
    justify-content: center;
    position: relative;
    width: 42px;
}

.user-name {
    color: #17192b;
    font-size: 16px;
    font-style: normal;
    font-weight: 500;
    line-height: 19px;
}

.user-position {
    color: #17192b80;
    font-size: 13px;
    font-style: normal;
    font-weight: 400;
    line-height: 16px;
}
.header__title {
    align-items: center;
}
</style>