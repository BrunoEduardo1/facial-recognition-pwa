//Update cache names any time any of the cached files change.
const CACHE_NAME = 'static-cache-v1';
const DATA_CACHE_NAME = 'data-cache-v1';
//for github pages
const repository = '/facial-recognition-pwa/';
// Add list of files to cache here.
const FILES_TO_CACHE = [
  '/facial-recognition-pwa/',
  repository+'/index.html',
  repository+'css/bootstrap.min.css',
  repository+'css/material.min.css',
  repository+'css/style.css',
  repository+'js/bootstrap.min.js' ,
  repository+'js/face-api.js',
  repository+'js/jquery-3.4.1.slim.min.js' ,
  repository+'js/main.js',
  repository+'js/models/face_expression_model-shard1',
  repository+'js/models/face_expression_model-weights_manifest.json',
  repository+'js/models/face_landmark_68_model-shard1',
  repository+'js/models/face_landmark_68_model-weights_manifest.json',
  repository+'js/models/face_landmark_68_tiny_model-shard1',
  repository+'js/models/face_landmark_68_tiny_model-weights_manifest.json',
  repository+'js/models/face_recognition_model-shard1',
  repository+'js/models/face_recognition_model-shard2',
  repository+'js/models/face_recognition_model-weights_manifest.json',
  repository+'js/models/tiny_face_detector_model-shard1',
  repository+'js/models/tiny_face_detector_model-weights_manifest.json',
  repository+'imgs/undraw_profile_pic_ic5t.svg',
  repository+'imgs/icons/icons.png',
  repository+'manifest.json'

];

self.addEventListener('install', function (event) {
  event.waitUntil(
    caches.open(CACHE_NAME).then(function (cache) {
      return cache.addAll(FILES_TO_CACHE);
    })
  )
});

self.addEventListener('activate', function activator(event) {
  event.waitUntil(
    caches.keys().then(function (keys) {
      return Promise.all(keys
        .filter(function (key) {
          return key.indexOf(CACHE_NAME) !== 0;
        })
        .map(function (key) {
          return caches.delete(key);
        })
      );
    })
  );
});

self.addEventListener('fetch', function (event) {
  event.respondWith(
    caches.match(event.request).then(function (cachedResponse) {
      return cachedResponse || fetch(event.request);
    })
  );
});