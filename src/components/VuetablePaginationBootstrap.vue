<template>
<nav>
    <ul class="pagination justify-content-center pagination-sm">
        <li :class="{'disabled': isOnFirstPage,'page-item':true}">
            <a class="page-link" href="" @click.prevent="loadPage('prev')">
                <span><i class='fas fa-arrow-left text-yellow' /></span>
            </a>
        </li>
        <template v-if="notEnoughPages">
            <li v-for="n in totalPage" :class="{'active': isCurrentPage(n), 'page-item':true}" :key="n">
                <a class="page-link" @click.prevent="loadPage(n)" v-html="n"></a>
            </li>
        </template>
        <template v-else>
            <li v-for="n in windowSize" :class="{'active': isCurrentPage(windowStart+n-1), 'page-item':true}" :key="n">
                <a class="page-link" @click.prevent="loadPage(windowStart+n-1)" v-html="windowStart+n-1"></a>
            </li>
        </template>
        <li :class="{'disabled': isOnLastPage,'page-item':true}">
            <a class="page-link" href="" @click.prevent="loadPage('next')">
                <span><i class='fas fa-arrow-right text-yellow' /></span>
            </a>
        </li>
    </ul>
</nav>
</template>

<script>
import VuetablePaginationMixin from 'vuetable-2/src/components/VuetablePaginationMixin'
export default {
    mixins: [VuetablePaginationMixin]
}
</script>
