# [General] app shows two different version numbers

The browser tab title says `v5.0`, while the footer of the same page says `v2.5`. When someone reports a bug, it is not clear which version they are on.

**Environment.** https://practicesoftwaretesting.com, Chrome, November 2026.

**Steps to reproduce**
1. Open https://practicesoftwaretesting.com/checkout
2. Compare the tab title with the version in the footer.

**Actual result.** Title shows "Toolshop - v5.0". Footer shows "v2.5 | Built 2026-10-11".

**Expected result.** One version number, the same everywhere.

**Severity.** Low. No user impact, but it slows down bug triage and support.

**QA suggestion** (to be confirmed with product, there may be a better solution). Read the version from one place at build time and use it in both the title and the footer.
