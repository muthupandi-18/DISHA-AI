export interface DistrictInfo {
  name: string;
  region: 'North' | 'South' | 'West' | 'Central';
  hubType: 'IT & Industrial' | 'Educational Hub' | 'Agricultural' | 'Coastal & Marine' | 'Textile & Manufacturing';
  collegeCount: number;
}

export const TN_DISTRICTS: DistrictInfo[] = [
  { name: 'Chennai', region: 'North', hubType: 'IT & Industrial', collegeCount: 68 },
  { name: 'Coimbatore', region: 'West', hubType: 'Educational Hub', collegeCount: 54 },
  { name: 'Madurai', region: 'South', hubType: 'Educational Hub', collegeCount: 32 },
  { name: 'Tiruchirappalli', region: 'Central', hubType: 'Educational Hub', collegeCount: 38 },
  { name: 'Salem', region: 'West', hubType: 'Textile & Manufacturing', collegeCount: 26 },
  { name: 'Erode', region: 'West', hubType: 'Educational Hub', collegeCount: 28 },
  { name: 'Tirunelveli', region: 'South', hubType: 'Educational Hub', collegeCount: 24 },
  { name: 'Vellore', region: 'North', hubType: 'Educational Hub', collegeCount: 22 },
  { name: 'Thanjavur', region: 'Central', hubType: 'Agricultural', collegeCount: 20 },
  { name: 'Kanchipuram', region: 'North', hubType: 'IT & Industrial', collegeCount: 25 },
  { name: 'Dindigul', region: 'South', hubType: 'Agricultural', collegeCount: 16 },
  { name: 'Tiruppur', region: 'West', hubType: 'Textile & Manufacturing', collegeCount: 18 },
  { name: 'Kanyakumari', region: 'South', hubType: 'Educational Hub', collegeCount: 22 },
  { name: 'Cuddalore', region: 'North', hubType: 'Coastal & Marine', collegeCount: 15 },
  { name: 'Nagapattinam', region: 'Central', hubType: 'Coastal & Marine', collegeCount: 12 },
  { name: 'Ramanathapuram', region: 'South', hubType: 'Coastal & Marine', collegeCount: 11 },
  { name: 'Thoothukudi', region: 'South', hubType: 'Coastal & Marine', collegeCount: 16 },
  { name: 'Namakkal', region: 'West', hubType: 'Educational Hub', collegeCount: 22 },
  { name: 'Dharmapuri', region: 'West', hubType: 'Agricultural', collegeCount: 12 },
  { name: 'Krishnagiri', region: 'West', hubType: 'IT & Industrial', collegeCount: 14 },
  { name: 'Thiruvallur', region: 'North', hubType: 'IT & Industrial', collegeCount: 28 },
  { name: 'Tiruvannamalai', region: 'North', hubType: 'Educational Hub', collegeCount: 14 },
  { name: 'Villupuram', region: 'North', hubType: 'Agricultural', collegeCount: 15 },
  { name: 'Perambalur', region: 'Central', hubType: 'Agricultural', collegeCount: 9 },
  { name: 'Ariyalur', region: 'Central', hubType: 'Agricultural', collegeCount: 8 },
  { name: 'Karur', region: 'Central', hubType: 'Textile & Manufacturing', collegeCount: 12 },
  { name: 'Pudukkottai', region: 'Central', hubType: 'Agricultural', collegeCount: 14 },
  { name: 'Sivaganga', region: 'South', hubType: 'Educational Hub', collegeCount: 15 },
  { name: 'Theni', region: 'South', hubType: 'Agricultural', collegeCount: 12 },
  { name: 'Virudhunagar', region: 'South', hubType: 'Educational Hub', collegeCount: 18 },
  { name: 'Nilgiris', region: 'West', hubType: 'Agricultural', collegeCount: 8 },
  { name: 'Tenkasi', region: 'South', hubType: 'Agricultural', collegeCount: 10 },
  { name: 'Tirupathur', region: 'North', hubType: 'Educational Hub', collegeCount: 9 },
  { name: 'Ranipet', region: 'North', hubType: 'IT & Industrial', collegeCount: 11 },
  { name: 'Chengalpattu', region: 'North', hubType: 'IT & Industrial', collegeCount: 30 },
  { name: 'Kallakurichi', region: 'North', hubType: 'Agricultural', collegeCount: 8 },
  { name: 'Mayiladuthurai', region: 'Central', hubType: 'Agricultural', collegeCount: 9 }
];

export const DISTRICT_NAMES = TN_DISTRICTS.map(d => d.name).sort();
