export interface Rule {
  id: string;
  type: 'DOMAIN-SUFFIX' | 'DOMAIN-KEYWORD' | 'GEOIP' | 'IP-CIDR' | 'PROCESS-NAME';
  value: string;
  policy: string;
}

export type RuleType = Rule['type'];