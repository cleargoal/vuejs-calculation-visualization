<template>
    <div class="greetings">
        <h1 class="green">{{ msg }}</h1>
    </div>
    <view-widget />
</template>

<script>
// import TheLegend from "@/components/TheLegend.vue";
import ViewWidget from "@/components/ViewWidget.vue";

export default {
    components: {/*TheLegend,*/ ViewWidget},
    props: {
        msg: {
            type: String,
            required: true
        }
    },
}
</script>

<style scoped>
h1 {
    font-weight: 600;
    font-size: 2.6rem;
    top: -10px;
}

h2 {
    font-weight: 500;
    font-size: 2.1rem;
}

h3 {
    font-size: 1.2rem;
}

.greetings h1,
.greetings h3 {
    text-align: center;
}

@media (min-width: 1024px) {
    .greetings h1,
    .greetings h3 {
        text-align: left;
    }
}
</style>
