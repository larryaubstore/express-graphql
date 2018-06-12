# Démarrer GraphiQL
```bash
$ npm run start
```

# Lancer test unitaires
```bash
npm run testonly
```

# Exemple de tests unitaires
[Tests unitaires sur le service qui interroge l'API de YAHOO](https://github.com/larryaubstore/express-graphql/blob/master/src/__tests__/yahoo-test.js)


## Question 1


### QL pour le Canada
```javascript
{
  quizOne(country: "CA") {
    name
    location {
      city
      country
      latitude
      longitude
    }
    condition {
      date
      temp
      text
    }
  }
}
```
### Résultat
```json
{
  "data": {
    "quizOne": [
      {
        "name": "Mobi",
        "location": {
          "city": "Vancouver",
          "country": "CA",
          "latitude": 49.2827,
          "longitude": -123.1207
        },
        "condition": {
          "date": "Mon, 11 Jun 2018 08:00 PM PDT",
          "temp": "58",
          "text": "Mostly Sunny"
        }
      },
      {
        "name": "Bike Share Toronto",
        "location": {
          "city": "Toronto, ON",
          "country": "CA",
          "latitude": 43.653226,
          "longitude": -79.3831843
        },
        "condition": {
          "date": "Mon, 11 Jun 2018 11:00 PM EDT",
          "temp": "58",
          "text": "Clear"
        }
      },
      {
        "name": "SoBi",
        "location": {
          "city": "Hamilton, ON",
          "country": "CA",
          "latitude": 43.25643601915583,
          "longitude": -79.86929655075073
        },
        "condition": {
          "date": "Mon, 11 Jun 2018 11:00 PM EDT",
          "temp": "56",
          "text": "Clear"
        }
      },
      {
        "name": "VeloGO",
        "location": {
          "city": "Ottawa, ON",
          "country": "CA",
          "latitude": 45.4285325522342,
          "longitude": -75.6970576741095
        },
        "condition": {
          "date": "Mon, 11 Jun 2018 11:00 PM EDT",
          "temp": "56",
          "text": "Cloudy"
        }
      },
      {
        "name": "Nextbike",
        "location": {
          "city": "Victoria",
          "country": "CA",
          "latitude": 48.4298,
          "longitude": -123.361
        },
        "condition": {
          "date": "Tue, 12 Jun 2018 01:00 PM AEST",
          "temp": "55",
          "text": "Partly Cloudy"
        }
      },
      {
        "name": "Bixi",
        "location": {
          "city": "Montréal, QC",
          "country": "CA",
          "latitude": 45.508693,
          "longitude": -73.553928
        },
        "condition": null
      }
    ]
  }
}

```

### QL pour la ville de Melbourne
```javascript
{
  quizOne(city: "Melbourne") {
    name
    location {
      city
      country
      latitude
      longitude
    }
    condition {
      date
      temp
      text
    }
  }
}
```

### Résultat
```json

{
  "data": {
    "quizOne": [
      {
        "name": "Melbourne Bike Share",
        "location": {
          "city": "Melbourne",
          "country": "AU",
          "latitude": -37.814107,
          "longitude": 144.96328
        },
        "condition": {
          "date": "Tue, 12 Jun 2018 12:00 PM AEST",
          "temp": "56",
          "text": "Breezy"
        }
      },
      {
        "name": "Monash BikeShare",
        "location": {
          "city": "Melbourne, AU",
          "country": "AU",
          "latitude": -37.91238410208696,
          "longitude": 145.1362281292677
        },
        "condition": {
          "date": "Tue, 12 Jun 2018 12:00 PM AEST",
          "temp": "56",
          "text": "Breezy"
        }
      }
    ]
  }
}
```


## Pour obtenir toutes les villes
###  QL par ville
```javascript
{
  allNetworks {
    networks {
      location {
        city
      }
    }
  }
}
```

### Résultat
```json
{
  "data": {
    "allNetworks": {
      "networks": [
        {
          "location": {
            "city": "Bielsko-Biała"
          }
        },
        {
          "location": {
            "city": "Melbourne"
          }
        },
        {
          "location": {
            "city": "Aspen, CO"
          }
        },
        {
          "location": {
            "city": "Wien"
          }
        },
        {
          "location": {
            "city": "Miami Beach, FL"
          }
        },
        {
          "location": {
            "city": "Copenhagen"
          }
        },
        {
          "location": {
            "city": "Vilagarcía de Arousa"
          }
        },
        {
          "location": {
            "city": "A Coruña"
          }
        },
        {
          "location": {
            "city": "Sorocaba"
          }
        }
      ]
    }
  }
}
```
