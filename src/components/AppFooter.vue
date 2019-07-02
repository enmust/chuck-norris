<template>
    <footer class="footer px-1 py-2 text-white">
        All jokes are fetched from Chuck Norris <a class="badge badge-light" href="https://api.chucknorris.io/" target="_blank">API</a>
    </footer>
</template>

<script>
    export default {
        name: "AppFooter"
    }
</script>

<style scoped>
    footer {
        text-align: center;
        font-size: 0.75rem;
        box-shadow: 0 4px 10px #000;
        background-color: #212121;
    }

    .badge {
        font-size: 100%;
    }

</style>
