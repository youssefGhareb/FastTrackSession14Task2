

var apikey = "b1f2801c41a34ff0b63c91c159cd152b";

$(document).ready(function () {
    controller.init();
});

var model = {
    countries: [],
    news: [],
    init: function () {
        this.fetchCountries();
    },
    fetchCountries: function () {
        $.ajax({
            url: "https://restcountries.com/v3.1/region/eu?fields=name,flags,cca2",
            type: "GET",
            success: this.onCountries,
            dataType: "json"
        }).done(countryCarouselView.init);
    },
    onCountries: function (data) {
        model.countries = data;
        console.log(data);
    },
    getCountries: function () {
        return this.countries;
    },
    fetchNews: function (code) {
        $.ajax({
            url: `https://newsapi.org/v2/top-headlines?country=${code}&apiKey=${apikey}`,
            type: "GET",
            success: this.onNews,
            dataType: "json"
        }).done(newsView.init);
    },
    onNews: function (data) {
        model.news = data;
    },
    getNews: function () {
        return this.news;
    }
}

var controller = {
    init: function () {
        model.init();
    },
    getCountries: function () {
        return model.getCountries();
    },
    countryClick: function (code) {
        model.fetchNews(code.toLowerCase());
    },
    getNews: function () {
        return model.getNews();
    }
}

var countryCarouselView = {
    countries: [],
    init: function () {
        countryCarouselView.render();
    },
    render: function () {
        this.countries = controller.getCountries();
        const template = $("#template").html();
        const rendered = Mustache.render(template, { countries: this.countries });
        $(".owl-carousel").html(rendered);
        $('.owl-carousel').owlCarousel({
            items: 1,
            loop: true,
            nav: false,
            singleItem: true,
        });
    }
}

var newsView = {
    news: [],
    init: function () {
        newsView.render();
    },
    render: function () {
        this.news = controller.getNews();
        const template = $("#news-template").html();
        const rendered = Mustache.render(template, { news: this.news.articles });
        $(".news").html(rendered);
    }
}