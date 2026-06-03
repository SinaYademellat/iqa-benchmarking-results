const IQA_CONFIG = {
    baseline: {
        title: "Baseline Results",
        folder: "results/baseline/",
        datasets: [
            { id: "csiq_base", name: "CSIQ Dataset", csvFile: "csiq_baseline_results.csv" },
            { id: "tid2013_base", name: "TID2013 Dataset", csvFile: "tid2013_baseline_results.csv" },
            { id: "kadid_base", name: "KADID10K Dataset", csvFile: "kadid10k_baseline_results.csv" },
            { id: "pipal_base", name: "PIPAL Dataset", csvFile: "pipal_baseline_results.csv" },
            { id: "live_patch1", name: "LIVE Dataset (Part 1)", csvFile: "live_results_p1.csv" },
            { id: "live_patch2", name: "LIVE Dataset (Part 2)", csvFile: "live_results_p2.csv" }
        ]
    },
    patching: {
        title: "Proposed Patching Results",
        folder: "results/Pathcing/default/",
        datasets: [
            { id: "csiq_patch", name: "CSIQ Dataset", csvFile: "csiq_results_Pathcing_D.csv" },
            { id: "tid2013_patch", name: "TID2013 Dataset", csvFile: "tid2013_results_Pathcing_D.csv" },
            { id: "kadid_patch", name: "KADID10K Dataset", csvFile: "kadid10k_results_Pathcing_D.csv" },
            { id: "pipal_patch", name: "PIPAL Dataset", csvFile: "pipal_baseline_results_Pathcing_D.csv" },
            { id: "live_patch1", name: "LIVE Dataset (Part 1)", csvFile: "live_patching_results_p1_D.csv" },
            { id: "live_patch2", name: "LIVE Dataset (Part 2)", csvFile: "live_patching_results_p2_D.csv" }
        ]
    }
};