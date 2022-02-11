const fs = require('fs')
const XMLWriter = require('xml-writer');
const fetch = require("node-fetch");


firstRequestToEtrollsApi().then(function (response) {
    xw = new XMLWriter;
    xw.startDocument('1.0', 'UTF-8');
    xw.startElement('urlset').writeAttribute('xmlns', 'http://www.sitemaps.org/schemas/sitemap/0.9');
    xw.startElement('url');
    xw.writeElement('loc', 'https://etrolls.in');
    xw.writeElement('lastmod', new Date().toISOString().split('T')[0]);
    xw.writeElement('changefreq', 'daily');
    xw.writeElement('priority', '0.1');
    for (let _i in response) {
        let { videoId, tags, dialog } = response[_i]
        xw.startElement('video:video')
            .writeElement('video:thumbnail_loc', 'https://img.youtube.com/vi/' + videoId + '/hqdefault.jpg')
            .writeElement('video:title', dialog)
            .writeElement('video:description', "Dailog from the cropped video is `" + dialog + "` and the cropped video is categorized with following " + tags)
            .writeElement('video:content_loc', "https://etrolls.in/onetroll/yt/" + videoId)
            .writeElement('video:player_loc', "https://www.youtube.com/watch?v=" + videoId)
            .endElement('video:video');

        xw.startElement('image:image')
            .writeElement('image:loc', 'https://img.youtube.com/vi/' + videoId + '/hqdefault.jpg')
            .writeElement('image:caption', dialog)
            .writeElement('image:title', dialog)
            .endElement('image:image');
    }
    xw.endElement('url');
    for (let _i in response) {
        let { videoId, tags, dialog } = response[_i]
        xw.startElement('url')
            .writeElement('loc', "https://etrolls.in/onetroll/yt/" + videoId)
            .writeElement('lastmod', new Date().toISOString().split('T')[0])
            .writeElement('changefreq', 'daily')
            .writeElement('priority', '0.1');
        xw.startElement('video:video')
            .writeElement('video:thumbnail_loc', 'https://img.youtube.com/vi/' + videoId + '/hqdefault.jpg')
            .writeElement('video:title', dialog)
            .writeElement('video:description', "Dailog from the cropped video is `" + dialog + "` and the cropped video is categorized with following " + tags)
            .writeElement('video:content_loc', "https://etrolls.in/onetroll/yt/" + videoId)
            .writeElement('video:player_loc', "https://www.youtube.com/watch?v=" + videoId)
            .endElement('video:video');
        xw.startElement('image:image')
            .writeElement('image:loc', 'https://img.youtube.com/vi/' + videoId + '/hqdefault.jpg')
            .writeElement('image:caption', dialog)
            .writeElement('image:title', dialog)
            .endElement('image:image');
        xw.endElement('url');

    }
    xw.endDocument();
    fs.writeFile('sitemap.xml', xw.toString(), (err) => {
        if (err) throw err;
    })
});

function firstRequestToEtrollsApi() {
    return fetch('https://api.etrolls.in/youtube/data/getAllRecords.json')
        .then(function (response) {
            return response.json();
        })
        .catch(function (err) {
            console.log(`Error: ${err}`)
        });
}