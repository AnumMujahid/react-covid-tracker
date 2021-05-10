import numeral from 'numeral';
import { Circle, Popup } from 'react-leaflet';

const casesTypeColors = {
  cases: {
    hex: '#CC1034',
    multiplier: 300,
  },
  recovered: {
    hex: '#7DD71D',
    multiplier: 500,
  },
  deaths: {
    hex: '#FB4443',
    multiplier: 1500,
  },
};

export const sortData = (data) => {
  const sortedData = [...data];
  return sortedData.sort((a, b) => (a.cases > b.cases ? -1 : 1));
};

export const prettyPrintStat = (stat) =>
  stat ? `+${numeral(stat).format('0.0a')}` : '+0';

export const showDataOnMap = (data, casesType = 'cases') => {
  return data.map((country, index) => (
    <Circle
      key={index}
      center={[country.countryInfo.lat, country.countryInfo.long]}
      fillOpacity={0.4}
      pathOptions={{
        color: casesTypeColors[casesType].hex,
        fillColor: casesTypeColors[casesType].hex,
      }}
      radius={
        Math.sqrt(country[casesType]) * casesTypeColors[casesType].multiplier
      }
    >
      <Popup>
        <div className="popup__container">
          <div
            className="popup__flag"
            style={{ backgroundImage: `url(${country.countryInfo.flag})` }}
          ></div>
          <div className="popup__name">{country.country}</div>
          <div className="popup__confirmed">
            Cases: {numeral(country.cases).format('0,0')}
          </div>
          <div className="popup__recovered">
            Recovered: {numeral(country.recovered).format('0,0')}
          </div>
          <div className="popup__deaths">
            Deaths: {numeral(country.deaths).format('0,0')}
          </div>
        </div>
      </Popup>
    </Circle>
  ));
};
