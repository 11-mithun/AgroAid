---
title: "AI-Crop-Assessment: A Lightweight CNN-Based System for Crop Damage Detection and Compensation Estimation"
authors:
  - name: "M. R. Vijayan"
    affiliation: "Meenakshi Sundararajan Engineering College, Chennai, Tamil Nadu, India"
  - name: "S. Kalaivani"
    affiliation: "Meenakshi Sundararajan Engineering College, Chennai, Tamil Nadu, India"
  - name: "R. Mithun"
    affiliation: "Meenakshi Sundararajan Engineering College, Chennai, Tamil Nadu, India"
version: "v1.0.0"
date: 2026-02-__ (fill actual date)
---

## Summary

AI-Crop-Assessment is an open-source Python system that integrates a lightweight convolutional neural network (CNN) to detect crop damage types from field images, provides Grad-CAM-based interpretability, and computes a rule-based financial compensation estimate.

Crop damage causes significant loss in agricultural productivity. This software assists farmers and agricultural stakeholders by automating image-based damage detection, severity classification, visual explanation, and compensation computation.

## Statement of Need

Traditional inspection systems for crop damage are manual, slow, and subjective. There is a need for a lightweight, field-deployable AI tool that:

1. Classifies crop images into Healthy, Disease-affected, Pest-affected, and Drought-affected categories.
2. Provides visual explanations of classification results via Grad-CAM.
3. Integrates simple rule-based logic for approximate insurance compensation computation.

This tool is useful for researchers, agritech developers, and data scientists building end-to-end crop assessment pipelines.

## Functionalities

The software includes:

* A lightweight CNN for inference
* Grad-CAM interpretability
* Flask based REST API backend
* Rule-based compensation engine
* Clear documentation and usage examples

## Usage

See the README for installation and example runs.

## Acknowledgements

This work was developed by the authors and is licensed under MIT License.

