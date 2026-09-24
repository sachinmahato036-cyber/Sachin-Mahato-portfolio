/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export interface Metric {
  label: string;
  value: string;
  description: string;
  trend?: string;
}

export interface Internship {
  company: string;
  role: string;
  duration: string;
  details: string[];
  skills: string[];
  color: string;
}

export interface ProjectSection {
  title: string;
  subtitle: string;
  metrics: Metric[];
  insights: string[];
  iconName: string;
}

export interface SkillCategory {
  name: string;
  color: string;
  skills: { name: string; level: number; description: string }[];
}
